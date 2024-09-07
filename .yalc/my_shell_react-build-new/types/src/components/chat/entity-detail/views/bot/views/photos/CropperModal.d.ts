import { BotPhotoTypeEnum } from '../../../../../../../../../src/common/constants/enums/bot.js';
import { ReturnedBotInfo } from '../../../../../../../../../src/common/constants/interfaces/bot.js';
import 'cropperjs/dist/cropper.css';
type CropperModalProps = {
    type: BotPhotoTypeEnum;
    botId: string;
    file: File | Blob;
    open: boolean;
    onClose: (needRefresh: boolean, data?: ReturnedBotInfo) => void;
};
declare function CropperModal({ type, botId, file, open, onClose }: CropperModalProps): import("react/jsx-runtime").JSX.Element;
export default CropperModal;
