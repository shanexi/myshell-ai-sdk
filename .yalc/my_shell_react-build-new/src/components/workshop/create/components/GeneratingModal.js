"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const react_2 = require("react");
const AutoPrompt_svg_1 = __importDefault(require("@/common/assets/icons/workshop/AutoPrompt.svg"));
const Thunder_svg_1 = __importDefault(require("@/common/assets/icons/workshop/Thunder.svg"));
const CreateLoading_gif_1 = __importDefault(require("@/common/assets/images/workshop/CreateLoading.gif"));
const CreateLoadingDark_gif_1 = __importDefault(require("@/common/assets/images/workshop/CreateLoadingDark.gif"));
function GeneratingModal(props) {
    const { isOpen, onClose, checkIfPromptIsExisted, loading, form, setCurrentFormHandle } = props;
    const t = (0, next_intl_1.useTranslations)('workshop');
    const [canCreate, setCanCreate] = (0, react_2.useState)(!!form.getFieldValue('description'));
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const loadingImg = resolvedTheme === 'dark' ? CreateLoadingDark_gif_1.default : CreateLoading_gif_1.default;
    (0, react_2.useEffect)(() => {
        setCanCreate(!!form.getFieldValue('promptDescription'));
    }, [form.getFieldValue('promptDescription')]);
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isCentered: true, size: "2xl", isOpen: isOpen, onClose: () => {
            return null;
        }, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, {}), (0, jsx_runtime_1.jsx)(react_1.ModalContent, { className: "min-h-[348px] bg-[#fdfdfd] dark:bg-[#202126] text-on-surface", children: loading.loading ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center min-h-[348px]", children: [(0, jsx_runtime_1.jsx)(image_1.default, { className: "text-[18px] w-[280px] h-[246px]", src: loadingImg, alt: "autoPrompt", priority: true }), (0, jsx_runtime_1.jsx)("p", { children: t('create_bot_profile_creating') })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_1.ModalHeader, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 flex items-center justify-center bg-[#F2F4FE] rounded-[8px] flex-shrink-0", children: (0, jsx_runtime_1.jsx)(image_1.default, { className: "text-[18px]", src: AutoPrompt_svg_1.default, alt: "autoPrompt", priority: true }) }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-on-surface text-[16px] font-bold", children: t('create_bot_profile_auto_prompt') }), (0, jsx_runtime_1.jsx)("div", { className: "text-secondary text-[12px]", children: t('create_bot_profile_creating') })] })] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_1.ModalCloseButton, { onClick: onClose, className: "text-secondary w-6 h-6 relative" }) })] }) }), (0, jsx_runtime_1.jsxs)(react_1.ModalBody, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-[190px] flex-col space-y-[10px]", children: (0, jsx_runtime_1.jsx)(form.Field, { name: "promptDescription", validateAsyncOn: "change", validateAsyncDebounceMs: 500, children: field => ((0, jsx_runtime_1.jsxs)("div", { className: `rounded-[12px] border border-default flex h-[200px] py-[8px] px-[12px] relative shadow `, children: [(0, jsx_runtime_1.jsx)("textarea", { name: field.name, className: "bg-transparent focus:border-none focus:outline-none flex-1 disabled:cursor-not-allowed h-[160px] resize-none", placeholder: t('create_bot_profile_description_placeholder'), ...field.getInputProps(), maxLength: 300, onChange: e => {
                                                        field.setValue(e.target.value);
                                                        setCanCreate(e.target.value != '');
                                                        setCurrentFormHandle({ promptDescription: e.target.value });
                                                    } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-[16px] bottom-1", children: (0, jsx_runtime_1.jsx)("span", { className: "text-[#B9B9B9] text-sm", children: `${field.getValue().length}/300` }) })] })) }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center w-full my-3", children: (0, jsx_runtime_1.jsxs)("button", { className: `bg-primary text-white rounded-[99px] text-[16px] font-bold py-2.5 px-6 h-[44px] flex justify-center items-center space-x-2 shadow-button-primary ${canCreate ? '' : 'opacity-30 cursor-not-allowed'}`, onClick: () => {
                                            canCreate && checkIfPromptIsExisted();
                                        }, children: [t('generate'), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-0.5 text-xs ml-1 font-bold", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: Thunder_svg_1.default, alt: "thunder icon", className: "w-[14px] h-[14px] mr-1" }), 30] })] }) })] })] })) })] }));
}
exports.default = GeneratingModal;
