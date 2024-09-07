import { EmbedObj } from '../../../../../../src/apis/common.js';
interface P {
    embedObjs: EmbedObj[];
    driving?: boolean;
    isImageGenerator?: boolean;
    messageId?: string;
}
export default function FileDisplay({ embedObjs, driving, isImageGenerator, messageId }: P): import("react/jsx-runtime").JSX.Element;
export {};
