import { UserInputType } from '../../../../../../../src/chat-new/services/useNewChatStore.js';
interface IAudioRecorder {
    interacting?: boolean;
    disabled?: boolean;
    exitAudioInput?: () => void;
    scrollLayoutToTop?: () => void;
    onSend: (audioBlob: Blob, mimeType?: string) => void;
    onChangeType: (type: UserInputType) => void;
}
export declare function AudioRecorder({ interacting, disabled, exitAudioInput, scrollLayoutToTop, onSend, onChangeType }: IAudioRecorder): import("react/jsx-runtime").JSX.Element;
export {};
