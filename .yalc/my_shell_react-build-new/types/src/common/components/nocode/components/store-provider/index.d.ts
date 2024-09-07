import React from 'react';
import { useStore } from 'zustand';
import { IAutomata } from '../../types/IAutomata';
import { IState } from '../../types/IState';
import { ITree, IAttrs, INodes, IAttr, INode } from '../../types/IStore';
import { IWidget } from '../../types/IWidget';
export interface IStore {
    tree?: ITree;
    attrs?: IAttrs;
    nodes?: INodes;
    active?: string;
    init: (automata: IAutomata) => void;
    setActive: (active: string) => void;
    modify: (path: string, item: {
        attr?: IAttr;
        node?: INode;
    }) => void;
    append: (parent: string, item: {
        attr?: IAttr;
        node?: INode;
    }) => void;
    remove: (path: string) => void;
    reorder: (path: string, item: {
        startIndex: number;
        endIndex: number;
    }) => void;
    override: (state: {
        tree?: ITree;
        nodes?: INodes;
        attrs?: IAttrs;
    }) => void;
}
export declare function stringify(store: {
    tree: ITree;
    nodes: INodes;
    attrs: IAttrs;
}): IAutomata | IState | IWidget | undefined;
export interface IStoreeProviderProps {
    automata: IAutomata;
    children: React.ReactNode | React.ReactNode[];
}
export declare const useStoreContext: () => import("zustand").UseBoundStore<import("zustand").StoreApi<IStore>>;
export { useStore };
export declare const StoreProvider: React.FC<IStoreeProviderProps>;
