declare type BemSel<T> = ((...args: string[]) => {
    [P in keyof T]: BemSel<T[P]>;
}) & {
    [P in keyof T]: BemSel<T[P]>;
} & {
    toString: () => string;
};
declare type Field = string | symbol | number;
declare function BEM<T>(t: T, key: Field, type: 'style' | 'attr', elements?: Field[]): BemSel<T>;
export default BEM;
export type { BemSel as BEM };
