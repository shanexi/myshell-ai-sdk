import React from 'react';
import { useStore } from 'zustand';
export interface IStore {
    jsonMode: boolean;
    setJsonMode: (mode: boolean) => void;
    key: string;
    setKey: () => void;
}
export declare const useStateContext: () => import("zustand").UseBoundStore<import("zustand").StoreApi<IStore>>;
export { useStore };
export interface IStateProviderProps {
    children: React.ReactNode | React.ReactNode[];
}
export declare const StateProvider: React.FC<IStateProviderProps>;
