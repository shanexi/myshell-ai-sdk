import { ChatModuleType } from '../../../../src/chat/ChatStaticContext.js';
import { ChatSetting } from '../model/definitions';
export default function useChatSetting(type: ChatModuleType, id: string): {
    loading: boolean;
    chatSetting: ChatSetting;
    getChatSetting: () => Promise<void>;
    updateChatSetting: (setting: ChatSetting) => Promise<void>;
};
