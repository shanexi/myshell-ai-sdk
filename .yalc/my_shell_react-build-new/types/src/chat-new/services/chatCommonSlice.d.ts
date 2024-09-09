import { InputType } from '../../../../src/chat/model/types';
import { StateCreator } from 'zustand';
import { MessageDetail } from '../../../../src/chat/model/interfaces';
export type ChatCommonStore = {
    inputType: InputType;
    setInputType(type: InputType): void;
    lastInputType: InputType;
    sharedChatIDList: string[];
    addChatID(id: string): void;
    removeChatID(id: string): void;
    clearChatID(): void;
    multiBotMap: Record<string, {
        chatList: MessageDetail[];
        chatDic: Map<string, MessageDetail>;
        networkError?: boolean;
    }>;
    setMessageHandled(params: {
        botId: string;
        msgId: string;
    }): void;
};
export declare const createChatCommonSlice: StateCreator<ChatCommonStore, [
    ['zustand/immer', never],
    ['zustand/devtools', never]
], [
]>;
