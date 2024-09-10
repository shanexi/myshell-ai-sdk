import { ChatModuleType } from '../../../../../../../../../src/chat/ChatStaticContext.js';
type P = {
    type: ChatModuleType;
    id: string;
    disabled?: boolean;
    onSuccess: () => void;
};
export default function RemoveFromList({ type, id, disabled, onSuccess }: P): import("react/jsx-runtime").JSX.Element;
export {};
