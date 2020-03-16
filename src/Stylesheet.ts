
type CssRule = {
    selector: string,
    property: Partial<CSSStyleDeclaration>,
}

export default class Stylesheet {
    private static list: CssRule[] = []

    static add(rules: CssRule[]) {
        this.list = this.list.concat(rules)
        this.update()
    }
    static delete(rules: CssRule[]) {
        this.list = this.list.filter(v => rules.find(s => s == v))
        this.update()
    }

    private static updateTimeOut:number|null = null
    private static update() {
        if(this.updateTimeOut) clearTimeout(this.updateTimeOut)

        setTimeout(()=>{
            document.getElementById('m-stylesheet')?.remove()
            const node = document.createElement('style')
            node.id = 'm-stylesheet'
    
            const styleHtml = this.list.map(v => `
    ${v.selector}{
        ${Object.keys(v.property).map( key => {
            const name = key.split('').map(v => v.toLocaleLowerCase() === v ? v : ('-' + v.toLocaleLowerCase())).join('')
            return `${name}:${(v.property as any)[key]}`
        }).join(';\r\n        ')}
    }
    \r\n`).join('\r\n')
    
            node.innerHTML = styleHtml
            document.head.appendChild(node)

            this.updateTimeOut = null
        },10)
    }
}

export type {CssRule}