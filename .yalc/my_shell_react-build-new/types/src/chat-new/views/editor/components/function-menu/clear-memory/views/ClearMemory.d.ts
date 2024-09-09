import { ChatModuleType } from '../../../../../../../../../src/chat/ChatStaticContext';
type P = {
    type: ChatModuleType;
    id: string;
    disabled?: boolean;
    onSuccess: () => void;
};
export default function ClearMemory({ type, id, disabled, onSuccess }: P): import("react/jsx-runtime").JSX.Element;
export {};
