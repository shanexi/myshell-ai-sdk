import { ReferenceSource } from '../../../../../../../src/chat/model/interfaces.js';
interface P {
    references: ReferenceSource[];
    showBottomBorder?: boolean;
    className?: string;
}
declare function References({ references, showBottomBorder, className }: P): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof References>;
export default _default;
