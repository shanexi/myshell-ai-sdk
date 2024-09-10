import { MessageDisplayType, MessageSource } from '../../../../chat-new/model/definitions';
export interface IMessageItemProps {
    source: MessageSource;
    msgDisplayType: MessageDisplayType;
}
export default function MessageItem({ msgDisplayType, source }: IMessageItemProps): import("react/jsx-runtime").JSX.Element;
JSX.Element;
