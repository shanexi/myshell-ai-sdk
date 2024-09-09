import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useContext } from 'react';
import { useToggle } from 'react-use';
import { MessageContext } from '../../chat-new/context/MessageContext.js';
import { StaticContext } from '../../chat-new/context/StaticContext.js';
import ChatShare from '../../chat/views/chat-share/ChatShare.js';
import { Separator } from '../../common/components/ui/separator.js';
import EditorSkeleton from './editor/skeleton/EditorSkeleton.js';
import MessageListSkeleton from './message-list/skeleton/MessageListSkeleton.js';
import { useNewChatStore } from '../services/useNewChatStore.js';
const Editor = dynamic(() => import('./editor/index.js'), {
    loading: () => _jsx(EditorSkeleton, {}),
    ssr: false
});
const MessageList = dynamic(() => import('./message-list/index.js'), {
    loading: () => _jsx(MessageListSkeleton, {}),
    ssr: false
});
export default function ChatModule({ bgUrl, editorAnchorRef, editorContainerRef, textareaRef, topActionsSlot, scrollLayoutToTop, showMobileDetail, otherModeSlot }) {
    const [bgImgLoaded, setBgImgLoaded] = useToggle(false);
    const handleBgImgLoaded = () => {
        setBgImgLoaded(true);
    };
    const inputType = useNewChatStore(state => state.inputType);
    const { entityInfo } = useContext(StaticContext);
    const { getDragRootProps } = useContext(MessageContext);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: clsx('w-full h-full flex flex-col bg-cover bg-center bg-no-repeat relative', !(bgUrl && bgImgLoaded) && 'bg-surface-default'), style: {
                    backgroundImage: bgUrl && bgImgLoaded ? `url('${bgUrl}')` : 'none'
                }, ...getDragRootProps?.(), children: [topActionsSlot, _jsx("div", { className: "renderer-container grow h-full overflow-y-auto no-scrollbar scroll-smooth px-4 md:px-6 py-0", children: _jsx(MessageList, {}) }), inputType === 'share' ? (_jsx("div", { className: "w-full z-10 border-t border-outline", children: _jsx(ChatShare, { selectedBot: {
                                name: entityInfo.name
                            } }) })) : null, inputType === 'text' ? (_jsxs(_Fragment, { children: [_jsx(Separator, { className: "w-full bg-[var(--border)] hidden md:block" }), _jsx("div", { ref: editorAnchorRef, className: "shrink-0 h-fit w-full", children: _jsx(Editor, { editorContainerRef: editorContainerRef, textareaRef: textareaRef, scrollLayoutToTop: scrollLayoutToTop, showMobileDetail: showMobileDetail, otherModeSlot: otherModeSlot }) })] })) : null] }), bgUrl && (_jsx(Image, { src: bgUrl, width: 1, height: 1, className: "hidden", alt: "Large Image", onLoad: handleBgImgLoaded, fetchPriority: "high" }))] }));
}
