import { BotInfo } from '../../../../../../../src/common/constants/interfaces/bot.js';
type props = {
    callUping: boolean;
    startRecording: () => void;
    disabled?: boolean;
    selectedBot: BotInfo | null;
};
declare function StartRecording({ startRecording, callUping, disabled }: props): import("react/jsx-runtime").JSX.Element;
export default StartRecording;
