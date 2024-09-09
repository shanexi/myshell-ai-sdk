import { ChatModuleType } from '../../../../../../../../../src/chat/ChatStaticContext.js';
export default function useGenerateShareLink(type: ChatModuleType, id: string, botId?: string): {
    generating: boolean;
    generateShareLink: () => Promise<string | undefined>;
};
