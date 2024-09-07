import React from 'react';
import { IMaterial } from '../../types/IMaterial';
import { IType } from '../../types/IStore';
import { TWidget } from '../../types/TWidget';
interface IContextProps {
    install: (type: IType, widget?: TWidget) => IMaterial | undefined;
    load: (pkg: string) => IMaterial | undefined;
}
export interface IMaterialProviderProps {
    children: React.ReactNode | React.ReactNode[];
}
export declare const useMaterialContext: () => IContextProps;
export declare const MaterialProvider: React.FC<IMaterialProviderProps>;
export {};
