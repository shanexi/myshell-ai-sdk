"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileUploader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const common_1 = require("../../../../apis/common.js");
const definitions_1 = require("../../../../common/components/file-uploader/models/definitions.js");
const DropZone_1 = __importDefault(require("../../../../common/components/file-uploader/views/DropZone.js"));
const UploadError_1 = __importDefault(require("../../../../common/components/file-uploader/views/file-list/file/UploadError.js"));
const Uploading_1 = __importDefault(require("../../../../common/components/file-uploader/views/file-list/file/Uploading.js"));
const display_1 = __importDefault(require("../../../../common/components/file-uploader/views/file-list/file/display/index.js"));
const getAcceptTypes_1 = require("../../../../common/components/nocode/utils/getAcceptTypes.js");
const utils_1 = require("../../../../lib/utils.js");
function FileUploader(props) {
    const { onChange, fileUpload: customFileUpload, maxSize, accept: originAccept, supportedFileTypes, scenario, suffix = '', value, multiple, ...rest } = props;
    const defaultList = (0, react_1.useMemo)(() => {
        if (Array.isArray(value)) {
            return value.map(item => ({
                resourceUrl: item,
                status: definitions_1.FileStatus.Uploaded
            }));
        }
        if (typeof value === 'string' && value) {
            return [
                {
                    resourceUrl: value,
                    status: definitions_1.FileStatus.Uploaded
                }
            ];
        }
        return [];
    }, [value, multiple]);
    const [fileList, setFileList] = (0, react_1.useState)(defaultList);
    const accept = (0, react_1.useMemo)(() => originAccept || (0, getAcceptTypes_1.getAcceptTypes)(supportedFileTypes), [originAccept, supportedFileTypes]);
    const onValueChange = (data) => {
        if (multiple) {
            const resourceUrlList = data.reduce((memo, item) => {
                if (item.status === definitions_1.FileStatus.Uploaded && item.resourceUrl) {
                    memo.push(item.resourceUrl);
                }
                return memo;
            }, []);
            onChange(resourceUrlList);
        }
        else {
            const fileInfo = data?.[0];
            if ((fileInfo?.status === definitions_1.FileStatus.Uploaded && fileInfo.resourceUrl) || !fileInfo?.resourceUrl) {
                onChange(fileInfo?.resourceUrl);
            }
        }
    };
    const fileUpload = (0, react_1.useCallback)((file) => {
        switch (customFileUpload) {
            case 'uploadFileToS3':
                return (0, common_1.uploadFileToS3)(scenario, suffix, file);
            case 'uploadFileToS3WithProgress':
                return (0, common_1.uploadFileToS3WithProgress)({
                    file,
                    scenario,
                    contentType: (0, getAcceptTypes_1.getContentType)(file),
                    onProgress: (value) => { },
                    cancelToken: (cancel) => { }
                });
            default:
                if (customFileUpload) {
                    return customFileUpload(file);
                }
                throw new Error('FileUploader: fileUpload is required.');
        }
    }, [customFileUpload, scenario]);
    const batchUpload = async (files) => {
        try {
            const data = await Promise.all(files.map(async (file) => {
                const { objectAccessUrl, objectKey } = await fileUpload(file.file);
                return {
                    file,
                    status: objectAccessUrl && objectKey ? definitions_1.FileStatus.Uploaded : definitions_1.FileStatus.Error,
                    resourceKey: objectKey || undefined,
                    resourceUrl: objectAccessUrl || undefined
                };
            }));
            setFileList(data.map(item => ({
                ...item,
                resourceUrl: undefined
            })));
            onValueChange(data);
        }
        catch (e) {
            console.error(e);
            const data = files.map(file => ({
                file,
                status: definitions_1.FileStatus.Error
            }));
            setFileList(data);
            onValueChange(data);
        }
    };
    const onFileChange = async (files) => {
        setFileList(files.map(file => ({ file, status: definitions_1.FileStatus.Uploading })));
        await batchUpload(files);
    };
    const onRetry = async (file) => {
        if (!file?.id) {
            return;
        }
        const index = fileList.findIndex(f => f?.file?.id === file.id);
        setFileList(prevState => {
            const newFileList = [...prevState];
            newFileList[index] = {
                ...fileList[index],
                status: definitions_1.FileStatus.Uploading
            };
            return newFileList;
        });
        const { objectAccessUrl, objectKey } = await fileUpload(file.file);
        setFileList(prevState => {
            const newFileList = [...prevState];
            newFileList[index] = {
                ...fileList[index],
                status: objectAccessUrl && objectKey ? definitions_1.FileStatus.Uploaded : definitions_1.FileStatus.Error,
                resourceKey: objectKey || undefined,
                resourceUrl: objectAccessUrl || undefined
            };
            onValueChange(newFileList);
            return newFileList.map(item => ({ ...item, resourceUrl: '' }));
        });
    };
    const onDelete = (0, react_1.useCallback)((fileId) => {
        const index = fileList.findIndex(file => file?.file?.id === fileId);
        setFileList(prevState => {
            const newFileList = [...prevState];
            newFileList.splice(index, 1);
            onValueChange(newFileList);
            return newFileList;
        });
    }, [fileList]);
    if (fileList?.length) {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: fileList?.map(item => {
                return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('min-h-[82px] w-full overflow-hidden flex items-center p-4 rounded-xl border border-default bg-surface-default shadow-background-default space-x-3', item.status === definitions_1.FileStatus.Error && 'border-critical'), children: item.status === definitions_1.FileStatus.Error ? ((0, jsx_runtime_1.jsx)(UploadError_1.default, { name: item?.file?.file?.name || '', onRetry: () => onRetry(item?.file), onDelete: () => onDelete(item?.file?.id || '') })) : item.status === definitions_1.FileStatus.Uploading ? ((0, jsx_runtime_1.jsx)(Uploading_1.default, {})) : ((0, jsx_runtime_1.jsx)(display_1.default, { file: item.resourceUrl || item?.file?.file || '', onDelete: () => onDelete(item?.file?.id || '') })) }));
            }) }));
    }
    return ((0, jsx_runtime_1.jsx)(DropZone_1.default, { ...rest, multiple: multiple, accept: accept, maxSize: maxSize, onFileChange: onFileChange }));
}
