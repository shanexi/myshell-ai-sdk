"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const LinkIcon_1 = __importDefault(require("@heroicons/react/24/outline/LinkIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dayjs_1 = __importDefault(require("dayjs"));
const file_saver_1 = require("file-saver");
const lucide_react_1 = require("lucide-react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const api_1 = require("../../../chat/model/api.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const runtime_config_1 = require("../../../common/utils/runtime-config.js");
const store_1 = require("../../../services/store/index.js");
function generateDateString() {
    const now = (0, dayjs_1.default)();
    const dateString = now.format('YYMMDDHHmmss');
    return dateString;
}
async function share2Twitter(url) {
    const link = document.createElement('a');
    link.href = `https://twitter.com/intent/tweet?url=${url}&text=@myshell_ai`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
async function download(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            reject('Could not download file');
        };
        xhr.send();
    });
}
async function downloadFile(link, botName) {
    const url = `${link}`;
    const fileName = `MyShell_ChatRecords_${botName}_${generateDateString()}.png`;
    await download(url).then((val) => {
        const file = new File([val], fileName, { type: val.type });
        (0, file_saver_1.saveAs)(file);
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
}
let shareCode = '';
let sortedSharedChatIDListCopied = [];
function ChatShare({ selectedBot }) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const sharedChatIDList = (0, store_1.useChatStore)(state => state.sharedChatIDList);
    const setInputType = (0, store_1.useChatStore)(state => state.setInputType);
    const lastInputType = (0, store_1.useChatStore)(state => state.lastInputType);
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const { success, warning } = (0, useNotification_1.useNotification)();
    const [loading, setLoading] = (0, react_2.useState)(false);
    const [loadingTarget, setLoadingTarget] = (0, react_2.useState)('');
    const t = (0, next_intl_1.useTranslations)('chat');
    const sortedSharedChatIDList = (0, react_2.useMemo)(() => {
        return [...sharedChatIDList].sort();
    }, [sharedChatIDList]);
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(text);
        }
        else {
            document.execCommand('copy', true, text);
        }
        success({
            content: commonT('copied')
        });
    }
    const generateConversation = (0, react_2.useCallback)(async (cb, host, options) => {
        if (sortedSharedChatIDList.length === 0) {
            warning({ content: commonT('select_chat') });
            return;
        }
        setLoading(true);
        try {
            if (sortedSharedChatIDListCopied.toString() !== sortedSharedChatIDList.toString()) {
                const res = (await (0, api_1.createMessageSharedCode)(sortedSharedChatIDList));
                shareCode = res?.data?.code;
                sortedSharedChatIDListCopied = sortedSharedChatIDList;
            }
            const link = `${window.location.origin}/share/${shareCode}`;
            const downlink = `${host}/api/image?url=${encodeURIComponent(`${link}?from=download`)}&ratio=1.5&type=png`;
            const isDownload = typeof options === 'object' && options.isDownload;
            await cb(isDownload ? downlink : link, isDownload ? options.botName : '');
        }
        finally {
            setLoading(false);
            setLoadingTarget('');
        }
    }, [commonT, sortedSharedChatIDList, warning]);
    async function onDownloadPhotoBtnClicked() {
        setLoadingTarget('img');
        await generateConversation(downloadFile, runtime_config_1.HTML2IMAGE_URL, { botName: selectedBot?.name, isDownload: true });
    }
    async function onCopyLinkBtnClicked() {
        setLoadingTarget('link');
        await generateConversation(copyTextToClipboard);
    }
    async function onTwitterBtnClicked() {
        setLoadingTarget('twitter');
        await generateConversation(share2Twitter);
    }
    const handleBackToPreviousInputType = () => {
        setInputType(lastInputType);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('chat-share', 'flex justify-center w-full relative chat-share bg-surface', isMobile ? 'py-4' : 'pt-12 pb-8'), children: [(0, jsx_runtime_1.jsxs)("ul", { className: (0, clsx_1.default)('flex items-center justify-around', isMobile ? 'w-full' : 'gap-20'), children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minW: "66px", h: "fit-content", className: "group", onClick: onCopyLinkBtnClicked, isDisabled: loading && loadingTarget === 'link', _disabled: {
                                opacity: 0.3,
                                cursor: 'not-allowed'
                            }, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center w-[40px] h-[40px] border border-default rounded-xl", children: loading && loadingTarget === 'link' ? ((0, jsx_runtime_1.jsx)(react_1.Spinner, { color: "var(--primary)" })) : ((0, jsx_runtime_1.jsx)(LinkIcon_1.default, { className: "text-primary w-6 h-6" })) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface font-normal", children: t('copy_link') })] }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minW: "66px", h: "fit-content", className: "group", onClick: onTwitterBtnClicked, isDisabled: loading && loadingTarget === 'link', _disabled: {
                                opacity: 0.3,
                                cursor: 'not-allowed'
                            }, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center w-[40px] h-[40px] border border-default rounded-xl", children: loading && loadingTarget === 'twitter' ? ((0, jsx_runtime_1.jsx)(react_1.Spinner, { color: "var(--primary)" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.TwitterIcon, { className: "text-primary stroke-[1.5px] w-6 h-6" })) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface font-normal", children: t('twitter') })] }) })] }), !isMobile && ((0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "absolute top-4 right-4 z-10 w-6 h-6 text-gray-500 cursor-pointer", onClick: () => handleBackToPreviousInputType() }))] }));
}
exports.default = ChatShare;
