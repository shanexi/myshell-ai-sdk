import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Spinner } from '@chakra-ui/react';
import LinkIcon from '@heroicons/react/24/outline/LinkIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import { TwitterIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { createMessageSharedCode } from '../../../chat/model/api.js';
import { useNotification } from '../../../common/hooks/useNotification.js';
import { usePathLocale } from '../../../common/hooks/usePathLocale.js';
import { HTML2IMAGE_URL } from '../../../common/utils/runtime-config.js';
import { useChatStore } from '../../../services/store/index.js';
function generateDateString() {
    const now = dayjs();
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
        saveAs(file);
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
}
let shareCode = '';
let sortedSharedChatIDListCopied = [];
function ChatShare({ selectedBot }) {
    const commonT = useTranslations('common');
    const sharedChatIDList = useChatStore(state => state.sharedChatIDList);
    const setInputType = useChatStore(state => state.setInputType);
    const lastInputType = useChatStore(state => state.lastInputType);
    const { isMobile } = usePathLocale();
    const { success, warning } = useNotification();
    const [loading, setLoading] = useState(false);
    const [loadingTarget, setLoadingTarget] = useState('');
    const t = useTranslations('chat');
    const sortedSharedChatIDList = useMemo(() => {
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
    const generateConversation = useCallback(async (cb, host, options) => {
        if (sortedSharedChatIDList.length === 0) {
            warning({ content: commonT('select_chat') });
            return;
        }
        setLoading(true);
        try {
            if (sortedSharedChatIDListCopied.toString() !== sortedSharedChatIDList.toString()) {
                const res = (await createMessageSharedCode(sortedSharedChatIDList));
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
        await generateConversation(downloadFile, HTML2IMAGE_URL, { botName: selectedBot?.name, isDownload: true });
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
    return (_jsxs("div", { className: clsx('chat-share', 'flex justify-center w-full relative chat-share bg-surface', isMobile ? 'py-4' : 'pt-12 pb-8'), children: [_jsxs("ul", { className: clsx('flex items-center justify-around', isMobile ? 'w-full' : 'gap-20'), children: [_jsx("li", { children: _jsxs(Button, { variant: "unstyled", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minW: "66px", h: "fit-content", className: "group", onClick: onCopyLinkBtnClicked, isDisabled: loading && loadingTarget === 'link', _disabled: {
                                opacity: 0.3,
                                cursor: 'not-allowed'
                            }, children: [_jsx("div", { className: "flex justify-center items-center w-[40px] h-[40px] border border-default rounded-xl", children: loading && loadingTarget === 'link' ? (_jsx(Spinner, { color: "var(--primary)" })) : (_jsx(LinkIcon, { className: "text-primary w-6 h-6" })) }), _jsx("span", { className: "text-sm text-on-surface font-normal", children: t('copy_link') })] }) }), _jsx("li", { children: _jsxs(Button, { variant: "unstyled", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minW: "66px", h: "fit-content", className: "group", onClick: onTwitterBtnClicked, isDisabled: loading && loadingTarget === 'link', _disabled: {
                                opacity: 0.3,
                                cursor: 'not-allowed'
                            }, children: [_jsx("div", { className: "flex justify-center items-center w-[40px] h-[40px] border border-default rounded-xl", children: loading && loadingTarget === 'twitter' ? (_jsx(Spinner, { color: "var(--primary)" })) : (_jsx(TwitterIcon, { className: "text-primary stroke-[1.5px] w-6 h-6" })) }), _jsx("span", { className: "text-sm text-on-surface font-normal", children: t('twitter') })] }) })] }), !isMobile && (_jsx(XMarkIcon, { className: "absolute top-4 right-4 z-10 w-6 h-6 text-gray-500 cursor-pointer", onClick: () => handleBackToPreviousInputType() }))] }));
}
export default ChatShare;
