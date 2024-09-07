"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowSmallUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowSmallUpIcon"));
const PlusSmallIcon_1 = __importDefault(require("@heroicons/react/24/outline/PlusSmallIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const file_display_1 = __importDefault(require("../file-display/index.js"));
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../common/components/MdViewer.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
const EmptyObj = {};
function ChatMessage({ chat, isMobile, className, showUserMessageActions }) {
    const msgRef = (0, react_1.useRef)(null);
    const [contentHeight, setContentHeight] = (0, react_1.useState)(160);
    const [isExpanded, setExpanded] = (0, react_1.useState)(false);
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const { imageGenMessageResponse, embedObjs } = chat;
    let imageMsgData = {};
    if (imageGenMessageResponse) {
        const { metadata, genParam } = imageGenMessageResponse;
        imageMsgData = {
            ...(genParam || {}),
            ...(metadata || {})
        };
        if (imageMsgData.genType === 'IMAGE_GEN_MESSAGE_TYPE_UPSCALE_MESSAGE') {
            imageMsgData.text = '/ Upscale';
            imageMsgData.show = true;
            imageMsgData.type = 'simple';
        }
        if (imageMsgData.genType === 'IMAGE_GEN_MESSAGE_TYPE_VARIATION_MESSAGE') {
            imageMsgData.text = '/ Variation';
            imageMsgData.show = true;
            imageMsgData.type = 'simple';
        }
        if (imageMsgData.genType === 'IMAGE_GEN_MESSAGE_TYPE_PANEL_MESSAGE') {
            imageMsgData.text = '/ Panel Image';
            imageMsgData.show = true;
            imageMsgData.type = 'complicated';
            imageMsgData.paramsOrder = [
                {
                    label: 'prompt',
                    value: 'prompt',
                    className: 'flex',
                    labelClassName: 'basis-[68px] grow-0',
                    valueClassName: 'flex-1'
                },
                {
                    label: 'negative prompt',
                    value: 'negativePrompt',
                    className: 'flex',
                    labelClassName: 'basis-[68px] grow-0',
                    valueClassName: 'flex-1'
                },
                {
                    label: 'model',
                    value: 'model',
                    className: 'flex',
                    labelClassName: 'basis-[54px] grow-0',
                    valueClassName: 'flex-1 whitespace-wrap break-all self-center'
                },
                { label: 'width', value: 'imageWidth', className: 'mr-2 inline-block' },
                { label: 'height', value: 'imageHeight', className: 'mr-2 inline-block' },
                { label: 'seed', value: 'seed', className: 'mr-2 inline-block' },
                {
                    label: 'sampling method',
                    value: 'samplingMethod',
                    className: 'mr-2 inline-block whitespace-nowrap',
                    labelClassName: 'inline-block w-[128px]'
                },
                { label: 'sampling steps', value: 'samplingSteps', className: 'mr-2 inline-block' },
                { label: 'CFG Scale', value: 'cfgScale', className: 'mr-2 inline-block' }
            ];
        }
    }
    const needExpand = !isMobile && imageMsgData.genType === 'IMAGE_GEN_MESSAGE_TYPE_PANEL_MESSAGE';
    (0, react_1.useEffect)(() => {
        if (msgRef.current && needExpand) {
            setContentHeight(msgRef.current.scrollHeight);
        }
    }, [needExpand]);
    const handleExpand = () => {
        setExpanded(prev => !prev);
    };
    const showFiles = Array.isArray(embedObjs) && embedObjs.length > 0;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex flex-col justify-start items-start bg-surface-primary-subtle-hovered rounded-tr-sm rounded-2xl max-w-full z-0 relative', className, chat.text && 'p-3'), children: [chat.text && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('z-0 relative max-w-full w-fit rounded-[7px] leading-[21px] break-words', chat.imSlashCommandInput ? 'text-brand' : 'text-on-surface', { 'group/msg': needExpand, 'pb-3': showFiles }, 'overflow-hidden transition-all', {
                    "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[160px] after:w-full after:pointer-events-none after:shadow-[inset_0_-100px_60px_-60px_white] dark:after:shadow-[inset_0_-100px_60px_-60px_black]": !isExpanded && needExpand
                }), style: needExpand ? { height: `${isExpanded ? contentHeight + 20 : '160'}px` } : EmptyObj, children: (0, jsx_runtime_1.jsxs)("div", { ref: msgRef, className: "break-word", children: [!imageMsgData.show &&
                            (chat.imSlashCommandInput ? ((0, jsx_runtime_1.jsx)("p", { className: "text-base whitespace-pre-wrap", children: chat.text })) : ((0, jsx_runtime_1.jsx)(MdViewer, { content: chat.text, status: chat.status }))), imageMsgData.show && imageMsgData.type === 'simple' && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "block", children: imageMsgData.text }), Number(imageMsgData.batchCount || 0) > 1 && ((0, jsx_runtime_1.jsxs)("span", { className: "border border-[#CCD4FF] dark:border-[#2B3561] rounded-md overflow-hidden mt-2 inline-block mr-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "bg-[#CCD4FF] dark:bg-[#2B3561] p-1.5  inline-block rounded-r-md", children: "Group" }), (0, jsx_runtime_1.jsx)("span", { className: "px-1.5", children: Number(imageMsgData.batchNumber) + 1 })] })), (0, jsx_runtime_1.jsxs)("span", { className: "border border-[#CCD4FF] dark:border-[#2B3561] rounded-md overflow-hidden mt-2 inline-block", children: [(0, jsx_runtime_1.jsx)("span", { className: "bg-[#CCD4FF] dark:bg-[#2B3561] p-1.5  inline-block rounded-r-md", children: "Number" }), (0, jsx_runtime_1.jsx)("span", { className: "px-1.5", children: Number(imageMsgData.imageNumber) + 1 })] })] })), imageMsgData.show && imageMsgData.type === 'complicated' && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "block", children: imageMsgData.text }), !!imageMsgData.sdParam &&
                                    imageMsgData.paramsOrder.map((params, index) => {
                                        return ((0, jsx_runtime_1.jsxs)("span", { className: (0, clsx_1.default)('border border-[#CCD4FF] dark:border-[#2B3561] rounded-md overflow-hidden mt-2', params.className), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, clsx_1.default)('bg-[#CCD4FF] dark:bg-[#2B3561] p-1.5  inline-block rounded-r-md', params.labelClassName), children: params.label }), (0, jsx_runtime_1.jsx)("span", { className: (0, clsx_1.default)('px-1.5', params.valueClassName), children: imageMsgData.sdParam[params.value] })] }, index));
                                    })] })), imageMsgData.show && imageMsgData.type === 'complicated' && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('absolute py-1 px-3 rounded-full bg-[#00000099] hidden justify-center items-center cursor-pointer animate-slideIn1', 'group-hover/msg:flex group-hover/msg:left-1/2 group-hover/msg:-translate-x-1/2', isExpanded ? 'bottom-5' : 'bottom-[65px]'), onClick: handleExpand, children: [!isExpanded && (0, jsx_runtime_1.jsx)(PlusSmallIcon_1.default, { className: "w-4 h-4 text-white" }), (0, jsx_runtime_1.jsx)("span", { className: "text-white mr-1 whitespace-nowrap", children: isExpanded ? chatT('panel.less') : chatT('panel.more') }), isExpanded && (0, jsx_runtime_1.jsx)(ArrowSmallUpIcon_1.default, { className: "w-4 h-4 text-white" })] }))] }) })), (chat?.embedObjs || [])?.length > 0 ? (0, jsx_runtime_1.jsx)(file_display_1.default, { embedObjs: chat.embedObjs }) : null] }));
}
exports.default = ChatMessage;
