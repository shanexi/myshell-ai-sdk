import { BotInfo } from '../../../../src/common/constants/interfaces/bot.js';
export declare enum RecordStateEnum {
    Idle = "Idle",
    Recording = "Recording",
    Stopped = "Stopped",
    Playing = "Playing",
    Completed = "Completed",
    CallUping = "CallUping"
}
export declare enum RecordActionType {
    INIT = "INIT",
    SET_RECORDER = "SET_RECORDER",
    SET_TIME = "SET_TIME",
    SET_TIME_UPDATE = "SET_TIME_UPDATE"
}
type Action = {
    type: RecordStateEnum | RecordActionType;
    payload?: any;
};
export interface State {
    status: RecordStateEnum;
    timeLeft: number;
    duration: number;
    recordBlob: Blob | null;
    recorder: MediaRecorder | null;
    chunks: Blob[];
    audioUrl: string;
    callUping: boolean;
    timeUpdate: number;
}
export default function useRecorder(botInfo?: BotInfo | null): {
    supportedType: string;
    startRecording: () => Promise<void>;
    stopRecording: () => Promise<unknown>;
    clearRecord: () => Promise<unknown>;
    state: State;
    dispatch: import("react").Dispatch<Action>;
};
export {};
