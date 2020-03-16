declare type CssRule = {
    selector: string;
    property: Partial<CSSStyleDeclaration>;
};
export default class Stylesheet {
    private static list;
    static add(rules: CssRule[]): void;
    static delete(rules: CssRule[]): void;
    private static updateTimeOut;
    private static update;
}
export type { CssRule };
