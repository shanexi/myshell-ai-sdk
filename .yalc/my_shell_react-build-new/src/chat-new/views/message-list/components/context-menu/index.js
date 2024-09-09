import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { isEmpty } from 'lodash-es';
import { useState } from 'react';
import { useMedia } from 'react-use';
import { EmbedObjStatus, EmbedObjType } from '../../../../../apis/common.js';
import ImgVideoPreview from '../../../../../chat/views/chat-body/file-display/img-video/preview/ImgVideoPreview.js';
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from '../../../../../common/components/ui/context-menu.js';
import ImageMenuItems from './image-menu-items.js';
import MessageMenuItems from './message-menu-items.js';
import { useDisplayContext } from '../display-provider/index.js';
export const ContextMenuProvider = ({ children }) => {
    const { actions } = useDisplayContext();
    const [previewImage, setPreviewImage] = useState();
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [xImage, setXImage] = useState();
    const isMiddle = useMedia('(max-width: 768px)');
    const onContextMenu = (event) => {
        const isImage = event?.target?.tagName?.toUpperCase() === 'IMG';
        if (isMiddle && (event.type === 'contextmenu' || isImage)) {
            event.preventDefault();
            return;
        }
        setIsImage(isImage);
        if (isImage) {
            const imageData = { url: event?.target?.getAttribute('src'), ...event?.target?.getAttribute('x-image-data') };
            setXImage(imageData);
        }
        if (isEmpty(actions) && !isImage) {
            event.preventDefault();
        }
    };
    const onDomClick = (event) => {
        if (event?.target?.tagName?.toUpperCase() === 'IMG' && event?.target?.getAttribute('x-intercept-click') === '1') {
            setPreviewImage({
                url: event?.target?.getAttribute('src'),
                title: event?.target?.getAttribute('alt'),
                type: EmbedObjType.IMAGE,
                status: EmbedObjStatus.DONE,
                extensionName: '',
                iconUrl: ''
            });
            setViewModalVisible(true);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(ContextMenu, { children: [_jsx(ContextMenuTrigger, { onContextMenu: onContextMenu, onClick: onDomClick, children: children }), _jsx(ContextMenuContent, { children: isImage ? _jsx(ImageMenuItems, { url: xImage?.url, imageModel: xImage?.imageModel }) : _jsx(MessageMenuItems, {}) })] }), _jsx(ImgVideoPreview, { open: viewModalVisible, onClose: () => {
                    setViewModalVisible(false);
                }, imgVideoList: previewImage ? [previewImage] : [], activeIndex: 0 })] }));
};
