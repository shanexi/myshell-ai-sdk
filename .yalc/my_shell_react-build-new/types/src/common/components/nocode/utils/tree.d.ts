import { ITree } from '../types/IStore';
declare const append: (root: ITree, target: string, tree: ITree) => ITree;
declare const remove: (path: string, tree: ITree) => ITree;
declare const count: (root: ITree, target: string) => number;
declare const reorder: (root: ITree, path: string, startIndex: number, endIndex: number) => ITree;
export { append, count, remove, reorder };
