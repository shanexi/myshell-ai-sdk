import { ReactNode } from 'react';
export interface ITextInput extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string;
    placeholder?: string;
    disabledReason?: string;
    onSend?: (text: string) => void;
    showMobileDetail?: () => void;
    audioInputSlot: ReactNode;
    loading: boolean;
    interactingDisabled?: boolean;
    energyPerChat?: number;
    showEnergyCostIcon?: boolean;
}
export declare const MobileTextInput: import("react").ForwardRefExoticComponent<ITextInput & import("react").RefAttributes<{
    focus: () => void;
    blur: () => void;
}>>;
