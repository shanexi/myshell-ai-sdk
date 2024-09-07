import { MutableRefObject } from 'react';
import { WidgetInfo } from '../../../../../src/common/constants/interfaces/workshop.js';
declare function WidgetVoiceInputUI({ onSend, widgetInfo, userSelectVoiceRef, isMobile, allowTextInput }: {
    onSend: (flag?: boolean) => void;
    widgetInfo?: WidgetInfo | null;
    userSelectVoiceRef: MutableRefObject<boolean>;
    isMobile?: boolean;
    allowTextInput?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof WidgetVoiceInputUI>;
export default _default;
