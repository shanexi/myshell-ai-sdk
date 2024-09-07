import { MutableRefObject } from 'react';
import { WidgetInfo } from '../../../../../src/common/constants/interfaces/workshop.js';
import { State } from './useWidgetRecorder';
declare const useWidgetVoiceInput: ({ onSend, widgetInfo, userSelectVoiceRef, isMobile }: {
    onSend: (flag?: boolean) => void;
    widgetInfo?: WidgetInfo | null;
    userSelectVoiceRef: MutableRefObject<boolean>;
    isMobile?: boolean;
}) => {
    audioPlayer: MutableRefObject<HTMLAudioElement | null>;
    state: State;
    sending: boolean;
    disabled: boolean;
    setWidgetInputType: (type: import("../../../chat/model/types").InputType) => void;
    handleSend: () => Promise<void>;
    afterPlayEnd: () => void;
    clearRecord: () => Promise<unknown>;
    stopRecording: () => Promise<unknown>;
    handlePlay: () => void;
    handleStartRecording: () => void;
    placeholder: string;
};
export default useWidgetVoiceInput;
