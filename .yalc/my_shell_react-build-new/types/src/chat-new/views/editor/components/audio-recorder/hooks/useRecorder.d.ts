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
    recordBlobDataURI: string | null;
    recorder: MediaRecorder | null;
    chunks: Blob[];
    audioUrl: string;
    callUping: boolean;
    timeUpdate: number;
    mimeType: string;
}
export default function useRecorder({ onChangePlayingAudio, onChangeInputType, onRecordEnd }: {
    onChangePlayingAudio: (audioId?: string | undefined) => void;
    onChangeInputType: (type: string) => void;
    onRecordEnd: (state: State) => Promise<void>;
}): {
    supportedType: string;
    startRecording: () => Promise<void>;
    stopRecording: () => Promise<unknown>;
    clearRecord: () => Promise<unknown>;
    state: State;
    dispatch: import("react").Dispatch<Action>;
};
export {};
