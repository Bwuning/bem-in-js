

type BemSel<T> = ((...args: string[]) => { [P in keyof T]: BemSel<T[P]> }) & { [P in keyof T]: BemSel<T[P]> } & { toString: () => string }

function forIn<T>(a: T): (keyof T)[] {
    return Object.keys(a) as any
}

type Field = string | symbol | number

const createBemTable = <T>(t: T, key: Field, elements: Field[] = [], type: 'style' | 'attr') => {
    const res = {} as { [P in keyof T]: BemSel<T[P]> }

    forIn(t).forEach(k => {
        res[k] = BEM(t[k], k, type, elements.concat([key])) as any
    })

    return res
}

const createBemToString = (key: Field, elements: Field[] = [], parse: (a: string) => string) => {
    return {
        toString: () => parse(elements.concat([key]).join('--'))
    }
}

function BEM<T>(t: T, key: Field, type: 'style' | 'attr', elements: Field[] = []): BemSel<T> {

    const parse = type === 'style'
        ? (v: string) => `[data-bem='${v}']`
        : (v: string) => v

    const fn = ((...arr: string[]) => {
        const _key = [key].concat(arr).join('__')

        const table = createBemTable(t, _key, elements, type)

        const toStr = createBemToString(_key, elements, parse)

        return Object.assign({}, table, toStr)
    }) as BemSel<T>

    const table = createBemTable(t, key, elements, type)
    const toStr = createBemToString(key, elements, parse)

    return Object.assign(fn, table, toStr)
}

export default BEM

export type { BemSel as BEM }