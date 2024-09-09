import { BotPhotoTypeEnum } from '../../../../../../src/common/constants/enums/bot';
import { ReturnedBotInfo } from '../../../../../../src/common/constants/interfaces/bot';
import 'cropperjs/dist/cropper.css';
type UserCropperModalProps = {
    type: BotPhotoTypeEnum;
    file: File | Blob;
    open: boolean;
    onClose: (needRefresh: boolean, data?: ReturnedBotInfo) => void;
};
declare function UserCropperModal({ type, file, open, onClose }: UserCropperModalProps): import("react/jsx-runtime").JSX.Element;
export default UserCropperModal;
