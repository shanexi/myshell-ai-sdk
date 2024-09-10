import { ChatModuleType } from '../../../../../../../chat/ChatStaticContext';
export default function useGenerateShareLink(type: ChatModuleType, id: string, botId?: string): {
    generating: boolean;
    generateShareLink: () => Promise<string | undefined>;
};
defined>;
};
