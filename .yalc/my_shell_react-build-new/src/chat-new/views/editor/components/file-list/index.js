import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ChevronLeftIcon from '@heroicons/react/24/solid/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { memo, useRef, useState, useMemo, useCallback, useEffect, useContext } from 'react';
import { useMedia } from 'react-use';
import { StaticContext } from '../../../../../chat-new/context/StaticContext.js';
import { useNewChatStore } from '../../../../../chat-new/services/useNewChatStore.js';
import FileCard from './file-card.js';
const ImgVideoPreview = dynamic(() => import('../../../../../chat/views/chat-body/file-display/img-video/preview/ImgVideoPreview.js'), {
    ssr: false
});
const Attachments = memo(() => {
    const isMobile = useMedia('(max-width: 768px)');
    const scrollerRef = useRef(null);
    const scrollPositionRef = useRef(0);
    const timerRef = useRef();
    const { entityInfo: { id: botId } } = useContext(StaticContext);
    const [scrollState, setScrollState] = useState({ canLeft: false, canRight: false });
    const [preview, setPreview] = useState({ visible: false, index: 0 });
    const files = useNewChatStore(state => state.fileUpload.filesMap[botId]);
    const uploadFiles = useNewChatStore(state => state.uploadFiles);
    const deleteUploadFiles = useNewChatStore(state => state.deleteUploadFiles);
    const imgVideoList = useMemo(() => {
        return (files || [])
            .filter(file => ['image', 'video'].includes(file.uiData.mimeType))
            .map(file => ({
            type: file.uiData.serverType,
            status: 'EMBED_OBJ_STATUS_DONE',
            title: file.uiData.name,
            url: file.url,
            id: file.id,
            extensionName: file.uiData.ex.toUpperCase(),
            mediaFileMetadata: file.meta
        }));
    }, [files]);
    const onSlide = (e, dir) => {
        e.preventDefault();
        document.getElementById('mobileInput')?.focus();
        if (scrollerRef.current) {
            const pDistance = scrollerRef.current.clientWidth;
            const left = scrollPositionRef.current + (dir === 'left' ? -pDistance : pDistance);
            scrollerRef.current.scrollTo({ left, behavior: 'smooth' });
        }
    };
    const setChevronVisible = useCallback(() => {
        if (scrollerRef.current) {
            scrollPositionRef.current = scrollerRef.current.scrollLeft;
            const { scrollWidth, clientWidth } = scrollerRef.current;
            setScrollState({
                canLeft: scrollPositionRef.current > 20,
                canRight: clientWidth + scrollPositionRef.current + 10 < scrollWidth
            });
        }
    }, []);
    const onScroll = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(setChevronVisible, 100);
    };
    useEffect(() => {
        setChevronVisible();
    }, [files?.length]);
    const onPreview = (id) => {
        const index = imgVideoList.findIndex(file => file.id === id);
        setPreview({ visible: true, index });
    };
    const isChoosingFile = useRef(false);
    const renderItems = (files) => {
        return (files || []).map((item, index) => (_jsx(FileCard, { data: item, onDelete: deleteUploadFiles, onPreview: onPreview, uploadFiles: uploadFiles, index: index, isMobile: isMobile, isChoosingFile: isChoosingFile }, item.id)));
    };
    if ((files || []).length === 0) {
        return null;
    }
    return (_jsxs("div", { className: "attachments relative w-full overflow-x-hidden -ml-3 -mr-3 px-3", children: [_jsx("button", { className: clsx('absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full border border-outline justify-center items-center bg-surface mt-[5px]', scrollState.canLeft ? 'flex' : 'hidden'), children: _jsx(ChevronLeftIcon, { className: clsx('w-[18px] h-[18px] cursor-pointer text-on-surface'), onClick: e => onSlide(e, 'left') }) }), _jsx("div", { className: clsx('w-full flex overflow-x-scroll no-scrollbar pt-[10px]'), ref: scrollerRef, onScroll: onScroll, children: renderItems(files) }), _jsx("button", { className: clsx('absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full border border-outline justify-center items-center bg-surface mt-[5px]', scrollState.canRight ? 'flex' : 'hidden'), children: _jsx(ChevronRightIcon, { className: clsx('w-[18px] h-[18px] cursor-pointer text-on-surface'), onClick: e => onSlide(e, 'right') }) }), preview.visible && (_jsx(ImgVideoPreview, { open: preview.visible, onClose: () => {
                    setPreview({ visible: false, index: 0 });
                }, imgVideoList: imgVideoList, activeIndex: preview.index }))] }));
});
Attachments.displayName = 'Attachments';
export default Attachments;
