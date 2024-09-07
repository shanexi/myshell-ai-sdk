"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUploadFiles = void 0;
const react_1 = require("react");
const react_dropzone_1 = require("react-dropzone");
const useNewChatStore_1 = require("../../../chat-new/services/useNewChatStore.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const utils_1 = require("./utils.js");
const useUploadFiles = ({ imPanelConfig, isChoosingFile, onFileDialogCancel, onTrack, uploadSettings, botId, disabled = true }) => {
    const uploadFiles = (0, useNewChatStore_1.useNewChatStore)(state => state.uploadFiles);
    const setFileAlert = (0, useNewChatStore_1.useNewChatStore)(state => state.setFileAlert);
    const showDragModal = (0, useNewChatStore_1.useNewChatStore)(state => state.showDragModal);
    const uploadedFilesLength = (0, useNewChatStore_1.useNewChatStore)(state => (state.fileUpload.filesMap[botId] || []).length);
    const { warning } = (0, useNotification_1.useNotification)();
    const onFileChange = (0, react_1.useCallback)(async (files) => {
        const res = await (0, utils_1.processUploadFiles)(botId, files);
        uploadFiles(botId, res);
    }, [botId, uploadFiles]);
    const maxFiles = (0, react_1.useMemo)(() => {
        return 10;
    }, []);
    const commonOptions = {
        accept: {},
        maxFiles,
        noKeyboard: true,
        maxSize: 1000000,
        onDragOver: () => showDragModal(true),
        onDrop: acceptedFiles => {
            if (!acceptedFiles.length) {
                if (isChoosingFile)
                    isChoosingFile.current = false;
                showDragModal(false);
                return;
            }
            const fileName = acceptedFiles[0].name;
            const fileType = fileName.substring(fileName.lastIndexOf('.') + 1);
            onTrack?.(fileType, acceptedFiles[0].size.toString());
            if (isChoosingFile)
                isChoosingFile.current = false;
            showDragModal(false);
            const nextLen = uploadedFilesLength + acceptedFiles.length;
            if (nextLen <= maxFiles) {
                onFileChange(acceptedFiles);
            }
            else {
            }
        },
        onDropRejected: fileRejections => {
            const tooMany = fileRejections.every(file => file.errors[0].code === 'too-many-files');
            if (tooMany) {
            }
            else {
                const unSupport = fileRejections
                    .filter(file => file.errors[0].code === 'file-invalid-type')
                    .map(file => ({
                    code: file.errors[0].code,
                    name: file.file.name
                }));
                const tooLarge = fileRejections
                    .filter(file => file.errors[0].code === 'file-too-large')
                    .map(file => ({
                    code: file.errors[0].code,
                    name: file.file.name
                }));
                setFileAlert({ visible: true, data: [unSupport, tooLarge] });
            }
        },
        onFileDialogOpen: () => {
            if (isChoosingFile)
                isChoosingFile.current = true;
        },
        onFileDialogCancel: () => {
            if (isChoosingFile)
                isChoosingFile.current = false;
            onFileDialogCancel?.();
        }
    };
    const clickOptions = {
        ...commonOptions,
        noClick: false,
        noDrag: true
    };
    const dragOptions = {
        ...commonOptions,
        noClick: true,
        noDrag: false
    };
    const { getRootProps: getDragRootProps } = (0, react_dropzone_1.useDropzone)(dragOptions);
    const { getRootProps: getClickRootProps, getInputProps } = (0, react_dropzone_1.useDropzone)(clickOptions);
    return { getDragRootProps, getClickRootProps, getInputProps };
};
exports.useUploadFiles = useUploadFiles;
