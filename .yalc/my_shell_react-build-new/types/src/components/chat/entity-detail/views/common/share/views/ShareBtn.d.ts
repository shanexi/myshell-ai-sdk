import { ChatModuleType } from '../../../../../../../chat/ChatStaticContext';
interface P {
    type: ChatModuleType;
    id: string;
    trackerFn: () => void;
}
declare function ShareBtn({ type, id, trackerFn }: P): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof ShareBtn>;
export default _default;
lt _default;
