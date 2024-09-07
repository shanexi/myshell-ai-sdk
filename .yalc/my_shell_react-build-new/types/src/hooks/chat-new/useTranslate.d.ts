import { TranslationStatus } from '../../../../src/chat-new/model/definitions.js';
import { ChatModuleType } from '../../../../src/chat/ChatStaticContext.js';
export default function useTranslate(type: ChatModuleType, id: string, addTranslationStream: (messageId: string, translation: string) => void): {
    translationStatus: TranslationStatus | undefined;
    translate: (messageId: string) => Promise<void>;
};
