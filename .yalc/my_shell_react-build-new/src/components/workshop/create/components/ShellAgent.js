"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const solid_1 = require("@heroicons/react/16/solid");
const outline_1 = require("@heroicons/react/24/outline");
const store_1 = require("../../../../services/store/index.js");
const views_1 = __importDefault(require("../../../../common/components/file-uploader/views/index.js"));
const getAcceptTypes_1 = require("../../../../common/components/nocode/utils/getAcceptTypes.js");
const common_1 = require("../../../../apis/common.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const alert_dialog_1 = require("../../../../common/components/ui/alert-dialog.js");
const react_use_1 = require("react-use");
const utils_1 = require("../../../../lib/utils.js");
const lodash_es_1 = require("lodash-es");
const separator_1 = require("../../../../common/components/ui/separator.js");
const button_1 = require("../../../../common/components/ui/button.js");
const react_1 = require("react");
const ShellAgentMode = ({ form, isMobile, onNoCodeChange }) => {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const [openDialog, setOpenDialog] = (0, react_use_1.useBoolean)(false);
    const [isExpand, setIsExpand] = (0, react_use_1.useBoolean)(false);
    const [lackDependency, setLackDependency] = (0, react_1.useState)();
    const currentForm = (0, store_1.useWorkshopStore)(state => state.currentForm);
    const setCurrentForm = (0, store_1.useWorkshopStore)(state => state.setCurrentForm);
    const onClose = () => {
        setOpenDialog(false);
    };
    const onConfirm = () => {
        onClose();
    };
    const checkDependency = (data) => {
        const deps = {
            models: {},
            widgets: {}
        };
        Object.entries(data.dependency.models || {}).forEach(([key, item]) => {
            if ((0, lodash_es_1.isEmpty)(item.urls)) {
                (0, lodash_es_1.set)(deps, ['models', key], item.filename);
            }
        });
        Object.entries(data.dependency.widgets || {}).forEach(([key, item]) => {
            if ((0, lodash_es_1.isEmpty)(item.git) || item.git === 'None') {
                (0, lodash_es_1.set)(deps, ['widgets', key], key);
            }
        });
        return deps;
    };
    const [state, onCheck] = (0, react_use_1.useAsyncFn)(async (url) => {
        const data = await fetch(url).then(res => res.json());
        const deps = checkDependency(data.data);
        if (!(0, lodash_es_1.isEmpty)(deps.models) || !(0, lodash_es_1.isEmpty)(deps.widgets)) {
            setLackDependency(deps);
            setOpenDialog(true);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "px-4 md:px-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { color: "subtlest", className: "pb-1.5", children: t('shell_agent_mode_tips') }), (0, jsx_runtime_1.jsx)(form.Field, { name: "opensourceModeInputFile", children: field => {
                            const value = field.getValue() || '';
                            const onChange = (resourceUrl) => {
                                if (!Array.isArray(resourceUrl)) {
                                    field.setValue(resourceUrl);
                                    setCurrentForm({ ...currentForm, opensourceModeInputFile: resourceUrl });
                                    onNoCodeChange();
                                    resourceUrl && onCheck(resourceUrl);
                                }
                            };
                            return ((0, jsx_runtime_1.jsx)(views_1.default, { fileUpload: "uploadFileToS3", scenario: common_1.Scenario.SCENARIO_IM_CHAT, accept: {
                                    'application/json': ['.json']
                                }, supportedFileTypes: getAcceptTypes_1.IServerFileType.MESSAGE_METADATA_TYPE_TEXT_FILE, onChange: onChange, description: "Upload ShellAgent JSON file", value: value }));
                        } })] }), (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialog, { open: openDialog, children: (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogPortal, { children: (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogContent, { style: { width: '380px' }, children: [(0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogHeader, { children: (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogTitle, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "rounded-full p-2 bg-surface-accent-yellow-subtler", children: (0, jsx_runtime_1.jsx)(outline_1.ExclamationTriangleIcon, { className: "w-6 h-6 text-warning" }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-9 h-9 flex cursor-pointer justify-center items-center focus-visible:outline-0 rounded-full hover:bg-surface-hovered", children: (0, jsx_runtime_1.jsx)(outline_1.XMarkIcon, { className: "w-6 h-6 text-icon-subtle", onClick: onClose }) })] }) }) }), (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogDescription, { className: "flex flex-col gap-1.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", children: "Warning" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtle", children: "The following items can\u2019t run in MyShell. Please contact our team to add them, or replace them with MyShell-supported items." }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center cursor-pointer", onClick: () => setIsExpand(!isExpand), children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: isExpand ? 'Show Less' : 'View Detail' }), (0, jsx_runtime_1.jsx)(solid_1.ChevronDownIcon, { className: (0, utils_1.cn)('w-4 h-4 ml-1.5 text-subtler', {
                                                    'rotate-180': isExpand
                                                }) })] }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex-1 rounded-lg border border-default p-3 w-[340px] max-h-60 overflow-x-hidden', {
                                            hidden: !isExpand
                                        }), children: Object.entries(lackDependency || {}).map(([key, item], idx) => {
                                            if ((0, lodash_es_1.isEmpty)(item)) {
                                                return null;
                                            }
                                            return ((0, jsx_runtime_1.jsxs)("div", { children: [idx ? (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "my-3" }) : null, (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: key.toLocaleUpperCase() }), (0, jsx_runtime_1.jsx)("div", { className: "mt-1 gap-2", children: Object.values(item).map(v => ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", className: "block break-words", children: v }))) })] }));
                                        }) })] }), (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogFooter, { children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1", color: "warning", onClick: onConfirm, children: "Confirm" }) })] }) }) })] }));
};
exports.default = ShellAgentMode;
