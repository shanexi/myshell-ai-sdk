import { MessageDetail } from '../../../../../src/chat/model/interfaces.js';
export default function useGenerateTts(): {
    generating: boolean;
    generateTts: (msg: MessageDetail, audioSpeed?: string, cb?: () => void) => Promise<void>;
};
