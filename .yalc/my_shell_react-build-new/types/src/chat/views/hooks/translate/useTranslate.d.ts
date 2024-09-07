import { MessageDetail } from '../../../../../../src/chat/model/interfaces.js';
export default function useTranslate(message: MessageDetail): {
    translate: () => Promise<unknown>;
};
