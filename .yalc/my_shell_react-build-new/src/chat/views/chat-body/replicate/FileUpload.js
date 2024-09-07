"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowUpTrayIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowUpTrayIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const common_1 = require("../../../../apis/common.js");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const FileDisplay_1 = __importDefault(require("./FileDisplay.js"));
const useDropFiles_1 = require("./useDropFiles.js");
function FileUpload(props) {
    const scrollerRef = (0, react_1.useRef)(null);
    const { botId, name = '', setFormValue, value, errors, clearErrors, supportedFileTypes, fileUploadSizeMaximum } = props;
    let fileName = props?.[`x_ms_name_${name}`];
    if (!fileName) {
        const arr = value.split('/');
        const ex = arr[arr.length - 1]?.split('.');
        fileName = ex[0];
    }
    let iconObj = useDropFiles_1.fileUIData.other;
    let fileType = '';
    if (value) {
        const arr = value.split('.');
        if (arr.length > 1) {
            const ex = arr[arr.length - 1];
            const e2MIME = `.${ex.toLowerCase()}`;
            fileType = useDropFiles_1.ex2MIME[e2MIME]?.split('/')?.[0];
            iconObj = useDropFiles_1.fileUIData[ex];
        }
    }
    const [file, setFile] = (0, react_1.useState)(value
        ? {
            status: 'completed',
            defaultUrl: value,
            file: {
                name: fileName,
                size: props?.[`x_ms_size_${name}`] ?? ''
            },
            uiData: {
                iconUrl: iconObj?.iconUrl,
                mimeType: fileType
            }
        }
        : undefined);
    const onDelete = () => {
        setFile(undefined);
        setFormValue(name, undefined);
        setFormValue(`x_ms_name_${name}`, undefined);
        setFormValue(`x_ms_size_${name}`, undefined);
    };
    const isChoosingFile = (0, react_1.useRef)(false);
    const uploadFiles = async (files, retry) => {
        for (const file of files) {
            setFile({
                ...file,
                status: 'pending'
            });
            const res = await (0, common_1.uploadFileToS3WithProgress)({
                scenario: common_1.Scenario.SCENARIO_IM_CHAT,
                contentType: file.uiData.contentType,
                onProgress: value => {
                    setFile({
                        ...file,
                        status: 'pending'
                    });
                },
                file: file.file,
                cancelToken: (cancel) => {
                }
            });
            if (res.success) {
                setFile({
                    ...file,
                    status: res?.objectAccessUrl ? 'completed' : 'error',
                    url: res?.objectAccessUrl,
                    defaultUrl: res?.objectAccessUrl
                });
                setFormValue(name, res?.objectAccessUrl);
                setFormValue(`x_ms_name_${name}`, file.file?.name);
                setFormValue(`x_ms_size_${name}`, file.file?.size);
                clearErrors(name);
            }
            else {
                setFile({
                    status: 'error',
                    type: 'network'
                });
            }
        }
    };
    const onFileChange = (0, react_1.useCallback)(async (files) => {
        try {
            const res = await (0, useDropFiles_1.processUploadFiles)(botId, files);
            uploadFiles(res);
        }
        catch {
            setFile({
                status: 'error',
                type: 'network'
            });
        }
    }, []);
    const { getRootProps, getInputProps } = (0, useDropFiles_1.useDropFiles)({
        onFileChange,
        from: 'input',
        botId,
        isChoosingFile,
        types: supportedFileTypes,
        setFile,
        fileMaxSize: fileUploadSizeMaximum
    });
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const isError = file && file?.status === 'error' ? chatT('replicate.maxfiles') : '';
    const isEmptyError = errors?.type === 'required';
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-full flex flex-col items-center justify-center p-3 border-[1px] bg-surface min-h-[96px] rounded-[12px]', isEmptyError || isError ? 'border-[#D72C0D]' : 'border-default'), ref: scrollerRef, style: {
                    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10)'
                }, children: file && !isError ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: file?.status === 'pending' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-center w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 px-2 rounded-[8px] bg-surface-container-low mb-2 flex flex-col items-center justify-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", className: "text-brand" }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-on-surface text-[16px] leading-[1] font-medium", children: chatT('replicate.uploading') })] })) : ((0, jsx_runtime_1.jsx)(FileDisplay_1.default, { data: file, onDelete: onDelete })) })) : ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full flex flex-col justify-center items-center cursor-pointer'), ...getRootProps(), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('rounded-[8px] w-10 h-10 bg-surface-container-low mb-2'), children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 flex items-center justify-center rounded-lg", children: (0, jsx_runtime_1.jsx)(ArrowUpTrayIcon_1.default, { className: "w-6 h-6 storke-[var(--bg-on-surface)]" }) }), (0, jsx_runtime_1.jsx)("input", { name: "file-upload", className: "sr-only hidden", multiple: false, ...getInputProps() })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-secondary text-[14px]", children: chatT('replicate.tip') })] })) }), isError ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-[#D72C0D] text-[14px] mt-1.5", children: [file.type == 'maxfiles' && chatT('replicate.maxfiles'), file.type == 'filesize' &&
                        chatT('replicate.upload_filesize_tip', {
                            maxSize: `${Math.ceil((fileUploadSizeMaximum || 50 * 1024 ** 2) / 1024 ** 2)}M`
                        }), file.type == 'network' && chatT('replicate.upload_network_tip'), file.type == 'invalid' && chatT('replicate.invalid_tip')] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: isEmptyError && ((0, jsx_runtime_1.jsx)("p", { className: "text-[#D72C0D] text-[14px] mt-1.5", children: chatT('replicate.upload_required_tip', { fieldName: name }) })) }))] }));
}
exports.default = (0, react_1.memo)(FileUpload);
