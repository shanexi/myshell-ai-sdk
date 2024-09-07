import { Accept } from 'react-dropzone';
import { FileWithId } from '../../../../../../src/common/components/file-uploader/models/definitions.js';
export interface FileUploaderDropZoneProps {
    title?: string;
    description?: string;
    dragActiveContent?: string;
    accept?: Accept;
    multiple?: boolean;
    minSize?: number;
    maxSize?: number;
    disabled?: boolean;
    onFileChange: (files: FileWithId[]) => Promise<void>;
}
export default function FileUploaderDropZone({ title, description, dragActiveContent, accept, multiple, minSize, maxSize, disabled, onFileChange }: FileUploaderDropZoneProps): import("react/jsx-runtime").JSX.Element;
