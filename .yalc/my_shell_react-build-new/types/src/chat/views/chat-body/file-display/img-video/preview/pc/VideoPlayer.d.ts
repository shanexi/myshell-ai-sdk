import { EmbedObj } from '../../../../../../../apis/common';
interface P {
    videoObj: EmbedObj;
    onClose: () => void;
    triggerPlay?: boolean;
}
declare function VideoPlayer({ videoObj, onClose, triggerPlay }: P): import("react/jsx-runtime").JSX.Element;
declare const MemorizedVideoPlayer: import("react").MemoExoticComponent<typeof VideoPlayer>;
export default MemorizedVideoPlayer;
VideoPlayer;
