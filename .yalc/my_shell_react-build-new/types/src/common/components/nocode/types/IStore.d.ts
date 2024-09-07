import { TValues } from '../../form-engine';
export interface ITree {
    path: string;
    children: ITree[];
}
export type IType = 'automata' | 'state' | 'widget';
export type IAttr = TValues;
export type IAttrs = {
    [path: string]: IAttr;
};
export type INode = {
    type: IType;
    name: string;
    title: string;
    pkg: string;
};
export type INodes = {
    [paht: string]: INode;
};
