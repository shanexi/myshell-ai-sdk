import { MessageDisplayType, MessageSource } from '../../../../../../src/chat-new/model/definitions.js';
export interface IMessageItemProps {
    source: MessageSource;
    msgDisplayType: MessageDisplayType;
}
export default function MessageItem({ msgDisplayType, source }: IMessageItemProps): import("react/jsx-runtime").JSX.Element;
