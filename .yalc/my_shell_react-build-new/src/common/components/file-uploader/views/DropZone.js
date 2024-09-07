"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileUploaderDropZone;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dropzone_1 = require("react-dropzone");
const getAcceptTypes_1 = require("../../../../common/components/nocode/utils/getAcceptTypes.js");
const arrow_up_tray_1 = require("../../../../common/components/ui/icons/outline/arrow-up-tray.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const utils_1 = require("../../../../lib/utils.js");
function FileUploaderDropZone({ title = 'Drop a file or click to upload', description, dragActiveContent = 'Move your file here', accept, multiple = false, minSize = 0, maxSize = Infinity, disabled = false, onFileChange }) {
    const { warning } = (0, useNotification_1.useNotification)();
    const generateRejectedFileError = (fileRejections) => {
        return fileRejections
            .map(rejection => `${rejection.file.name}: ${rejection.errors.map(error => error.message).join(' ,')}`)
            .join(' ;');
    };
    const desc = (0, react_1.useMemo)(() => {
        if (description) {
            return description;
        }
        if (accept) {
            const types = (0, getAcceptTypes_1.getFileTypesByAccept)(accept).join(', ');
            return `Any ${types === '*' ? 'file to upload' : types}. Large files may cause upload failure.`;
        }
        return 'Any JPG, JPEG, PNG or WEBP up to 5MB';
    }, [accept, description]);
    const onDrop = async (acceptedFiles, fileRejections, event) => {
        if (fileRejections.length) {
            warning({
                content: generateRejectedFileError(fileRejections)
            });
            return;
        }
        if (acceptedFiles.length) {
            await onFileChange(acceptedFiles.map(file => ({
                file,
                id: (0, common_helper_1.generateUUID)()
            })));
        }
    };
    const { getRootProps, getInputProps, isDragActive } = (0, react_dropzone_1.useDropzone)({
        onDrop,
        multiple,
        minSize,
        maxSize,
        accept,
        disabled
    });
    return ((0, jsx_runtime_1.jsxs)("div", { ...getRootProps({ className: 'dropzone' }), children: [(0, jsx_runtime_1.jsx)("input", { ...getInputProps() }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('min-h-[82px] w-full overflow-hidden flex items-center p-4 rounded-xl border border-default bg-surface-default shadow-background-default space-x-3 hover:border-hovered active:border-pressed cursor-pointer', isDragActive && 'border-dashed border-pressed'), children: isDragActive ? ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex justify-center items-center text-sm font-medium", children: dragActiveContent })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-xl bg-surface-accent-gray-subtlest flex justify-center items-center shrink-0", children: (0, jsx_runtime_1.jsx)(arrow_up_tray_1.ArrowUpTray, { size: "2xl", color: "default" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 grow overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-default truncate", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "text-left text-sm text-subtler line-clamp-2", children: desc })] })] })) })] }));
}
