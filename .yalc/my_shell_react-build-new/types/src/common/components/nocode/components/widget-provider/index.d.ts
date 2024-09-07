import React from 'react';
import { TWidget } from '../../types/TWidget';
export interface IWidgetProviderProps {
    widgets?: TWidget[];
    children: React.ReactNode | React.ReactNode[];
}
export declare const useWidgetContext: () => {
    widgets?: TWidget[];
};
export declare const WidgetProvider: React.FC<IWidgetProviderProps>;
