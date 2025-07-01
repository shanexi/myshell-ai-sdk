import { type DocFragment, type SelectionSnapshot, type Writeable } from "./types";
export type EditableCommand<T extends unknown[]> = (doc: Writeable<DocFragment>, selection: Writeable<SelectionSnapshot>, ...args: T) => void;
export declare const Delete: EditableCommand<[range?: SelectionSnapshot]>;
export declare const Clear: EditableCommand<[range?: SelectionSnapshot]>;
export declare const InsertFragment: EditableCommand<[lines: DocFragment]>;
export declare const InsertText: EditableCommand<[text: string]>;
