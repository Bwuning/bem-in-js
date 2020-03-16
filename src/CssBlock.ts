import createBem, { BEM } from './BEM'
import Stylesheet, { CssRule } from './Stylesheet'

export default class CssBlock<T>{
    private styleBEM: BEM<T>
    private attrBEM: BEM<T>
    private name: string

    private rulelist: CssRule[]

    static gen<T>(name: string, t: T) {
        return new this(name, t)
    }

    constructor(name: string, t: T) {
        this.styleBEM = createBem(t, name, 'style')
        this.attrBEM = createBem(t, name, 'attr')
        this.name = name
        this.rulelist = []
    }

    rule(rule: (target: BEM<T>) => [string | { toString: () => string }, Partial<CSSStyleDeclaration>]) {
        console.log(this.rulelist.length)
        const [selector, property] = rule(this.styleBEM)
        Stylesheet.delete(this.rulelist)
        console.log(this.rulelist.length)
        this.rulelist.push({ selector: selector.toString(), property })
        Stylesheet.add(this.rulelist)
        return this
    }

    rules(rule: (target: BEM<T>) => (string | { toString: () => string } | Partial<CSSStyleDeclaration>)[]) {
        const list = rule(this.styleBEM)
        const res: {
            selector: (string | { toString: () => string })[],
            property: Partial<CSSStyleDeclaration>
        }[] = []

        let flag = false
        list.forEach(v => {
            if (typeof v === 'string' || v.hasOwnProperty('toString')) {
                if (flag === false) {
                    res.push({
                        selector: [v],
                        property: {}
                    })
                } else {
                    res[res.length - 1]?.selector.push(v)
                }
                flag = true
            } else {
                const c = v as Partial<CSSStyleDeclaration>
                const s = res[res.length - 1]
                if (s)
                    s.property = Object.assign(s.property, c)

                flag = false
            }
        })

        res.forEach(v=>[
            this.rule(()=>[v.selector,v.property])
        ])

        return this
    }

    getTag() { return this.attrBEM }
}