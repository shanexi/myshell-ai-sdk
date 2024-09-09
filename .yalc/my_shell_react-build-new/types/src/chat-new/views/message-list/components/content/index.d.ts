import { DisplayMessage } from '../../../../../../../src/chat-new/model/definitions';
export interface IContentProps {
    message: DisplayMessage;
    showText?: boolean;
    showAudio?: boolean;
}
export default function Content({ message, showText, showAudio }: IContentProps): import("react/jsx-runtime").JSX.Element;
