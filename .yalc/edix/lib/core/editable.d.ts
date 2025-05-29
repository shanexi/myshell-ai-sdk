import { EditableCommand } from "./doc/commands";
import { EditableSchema } from "./schema";
/**
 * Options of {@link editable}.
 */
export interface EditableOptions<T> {
    /**
     * TODO
     */
    schema: EditableSchema<T>;
    /**
     * TODO
     */
    isBlock?: (node: HTMLElement) => boolean;
    /**
     * TODO
     */
    onChange: (value: T) => void;
}
/**
 * Methods of editor instance.
 */
export interface EditableHandle {
    /**
     * Disposes editor and restores previous DOM state.
     */
    dispose: () => void;
    /**
     * Dispatches editing command.
     * @param fn command function
     * @param args arguments of command
     */
    command: <A extends unknown[]>(fn: EditableCommand<A>, ...args: A) => void;
    /**
     * Changes editor's read-only state.
     * @param value `true` to read-only. `false` to editable.
     */
    readonly: (value: boolean) => void;
    syncSelection: () => void;
}
/**
 * A function to make DOM editable.
 */
export declare const editable: <T>(element: HTMLElement, { schema: { single: isSingleline, js: docToJS, void: serializeVoid, copy, paste, }, isBlock, onChange, }: EditableOptions<T>) => EditableHandle;
