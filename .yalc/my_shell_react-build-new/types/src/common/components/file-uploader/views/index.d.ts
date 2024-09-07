import { PreSignUrlResponse, Scenario } from '../../../../../../src/apis/common.js';
import { FileUploaderDropZoneProps } from '../../../../../../src/common/components/file-uploader/views/DropZone.js';
import { IServerFileType } from '../../../../../../src/common/components/nocode/utils/getAcceptTypes.js';
interface FileUploaderProps extends Omit<FileUploaderDropZoneProps, 'onFileChange'> {
    scenario: Scenario;
    suffix?: string;
    supportedFileTypes: IServerFileType | IServerFileType[];
    fileUpload?: 'uploadFileToS3' | 'uploadFileToS3WithProgress' | ((file: File) => Promise<Pick<PreSignUrlResponse, 'objectKey' | 'objectAccessUrl'>>);
    onChange: (resourceUrl?: string | string[]) => void;
    value: string | string[];
}
export default function FileUploader(props: FileUploaderProps): import("react/jsx-runtime").JSX.Element;
export {};
