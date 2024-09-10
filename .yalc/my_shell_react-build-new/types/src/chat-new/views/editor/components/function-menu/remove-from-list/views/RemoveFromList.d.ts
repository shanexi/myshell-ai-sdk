import { ChatModuleType } from '../../../../../../../chat/ChatStaticContext';
type P = {
    type: ChatModuleType;
    id: string;
    disabled?: boolean;
    onSuccess: () => void;
};
export default function RemoveFromList({ type, id, disabled, onSuccess }: P): import("react/jsx-runtime").JSX.Element;
export {};
;
export {};
