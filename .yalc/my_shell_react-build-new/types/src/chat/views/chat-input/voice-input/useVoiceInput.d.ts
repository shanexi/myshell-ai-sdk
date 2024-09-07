import { MutableRefObject } from 'react';
import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
import { State } from '../../../../../../src/common/hooks/useRecorder.js';
declare const useVoiceInput: ({ onSend, selectedBot, userSelectVoiceRef, isMobile, workshopChat }: {
    onSend: (flag?: boolean) => void;
    selectedBot?: BotInfo | null;
    userSelectVoiceRef: MutableRefObject<boolean>;
    isMobile?: boolean;
    workshopChat?: boolean;
}) => {
    audioPlayer: MutableRefObject<HTMLAudioElement | null>;
    state: State;
    sending: boolean;
    disabled: boolean;
    setInputType: (type: import("../../../model/types").InputType) => void;
    handleSend: () => Promise<void>;
    afterPlayEnd: () => void;
    clearRecord: () => Promise<unknown>;
    stopRecording: () => Promise<unknown>;
    handlePlay: () => void;
    handleStartRecording: () => void;
    placeholder: string;
};
export default useVoiceInput;
