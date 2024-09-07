import { MessageComponentsButton } from '../../../../../../src/chat/model/interfaces.js';
interface P {
    buttonProps: MessageComponentsButton;
    index: number;
    rowIndex: number;
    latest?: boolean;
    disabled?: boolean;
}
declare function Button({ buttonProps, index, rowIndex, latest, disabled }: P): import("react/jsx-runtime").JSX.Element;
export default Button;
