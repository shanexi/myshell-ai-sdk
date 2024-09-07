import { MessageStatusEnum } from '../../../../../../../src/chat/model/enums.js';
import { AudioStreamDetail } from '../../../../../../../src/chat/model/interfaces.js';
import { WidgetAudioStreamDetail } from '../../../../../../../src/common/constants/interfaces/workshop.js';
interface AudioStreamProps {
    replyUid: string;
    id: string;
    audioList?: Array<AudioStreamDetail | WidgetAudioStreamDetail>;
    borderColor: string;
    messageStatus: MessageStatusEnum;
    autoPlay?: boolean;
    showProgressBar: boolean;
}
declare function AudioStreamPlayer({ replyUid, id, audioList, borderColor, messageStatus, autoPlay, showProgressBar }: AudioStreamProps): import("react/jsx-runtime").JSX.Element;
export default AudioStreamPlayer;
