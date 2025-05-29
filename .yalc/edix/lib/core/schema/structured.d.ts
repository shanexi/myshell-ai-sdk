import type { EditableSchema } from "./types";
export interface EditableVoidSerializer<T> {
    is: (node: HTMLElement) => boolean;
    data: (node: HTMLElement) => T;
    plain: (data: T) => string;
}
export declare const voidNode: <const D>({ is, data, plain, }: {
    is: (node: HTMLElement) => boolean;
    data: (node: HTMLElement) => D;
    plain?: (data: D) => string;
}) => EditableVoidSerializer<D>;
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type ExtractVoidData<T> = T extends EditableVoidSerializer<infer D> ? D : never;
type ExtractVoidNode<T> = Prettify<{
    [K in keyof T]: {
        type: K;
        data: ExtractVoidData<T[K]>;
    };
}[keyof T]>;
/**
 * Defines structured text schema.
 */
export declare const schema: <V extends Record<string, EditableVoidSerializer<any>> = {}, M extends boolean = false>({ multiline, void: voids, }: {
    multiline?: M;
    void?: V;
}) => EditableSchema<M extends true ? (ExtractVoidNode<V> | {
    type: "text";
    text: string;
})[][] : (ExtractVoidNode<V> | {
    type: "text";
    text: string;
})[]>;
export {};
