import { MessageComponentsButtonContent, MessageComponentsButtonStyle } from '../../../../../../src/chat/model/interfaces.js';
interface P {
    content: MessageComponentsButtonContent;
    style: MessageComponentsButtonStyle;
    disabled: boolean;
    loading?: boolean;
    onClick?: () => void;
    energy: number;
}
declare function Display(props: P): import("react/jsx-runtime").JSX.Element;
export default Display;
