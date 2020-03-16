import { BEM } from './BEM';
export default class CssBlock<T> {
    private styleBEM;
    private attrBEM;
    private name;
    private rulelist;
    static gen<T>(name: string, t: T): CssBlock<T>;
    constructor(name: string, t: T);
    rule(rule: (target: BEM<T>) => [string | {
        toString: () => string;
    }, Partial<CSSStyleDeclaration>]): this;
    rules(rule: (target: BEM<T>) => (string | {
        toString: () => string;
    } | Partial<CSSStyleDeclaration>)[]): this;
    getTag(): BEM<T>;
}
