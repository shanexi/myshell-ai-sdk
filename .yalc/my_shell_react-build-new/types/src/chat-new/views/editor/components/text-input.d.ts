export interface ITextInput extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string;
    placeholder?: string;
    disabledReason?: string;
    onSend?: (text: string) => void;
}
export declare const TextInput: import("react").ForwardRefExoticComponent<ITextInput & import("react").RefAttributes<{
    focus: () => void;
    blur: () => void;
}>>;
