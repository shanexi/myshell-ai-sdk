import React from 'react';
import { DisplayMessage, MenuActionType, MessageDisplayMode } from '../../../../../chat-new/model/definitions';
export interface IDisplayProviderProps {
    message?: DisplayMessage;
    children: React.ReactNode | React.ReactNode[];
}
export declare const useDisplayContext: () => {
    message?: DisplayMessage;
    actions: MenuActionType[];
    displayMode: MessageDisplayMode;
    setDisplayMode: (mode: MessageDisplayMode) => void;
};
export declare const DisplayProvider: React.FC<IDisplayProviderProps>;
viderProps>;
