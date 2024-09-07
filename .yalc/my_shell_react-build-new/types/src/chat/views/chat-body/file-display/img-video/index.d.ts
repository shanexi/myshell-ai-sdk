import { EmbedObj } from '../../../../../../../src/apis/common.js';
interface P {
    imgVideoList: EmbedObj[];
    driving?: boolean;
    isImageGenerator?: boolean;
    messageId?: string;
}
declare function ImgVideoList({ imgVideoList, driving, isImageGenerator, messageId }: P): import("react/jsx-runtime").JSX.Element;
declare const MediaFileList: import("react").MemoExoticComponent<typeof ImgVideoList>;
export default MediaFileList;
