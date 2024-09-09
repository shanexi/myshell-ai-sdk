import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useCallback, useContext, useState } from 'react';
import { LUIButtonInteractionContext } from '../../../../../../common/components/lui/luiContext.js';
import { Modal } from '../../../../../../common/components/ui/modal.js';
import { useDevice } from '../../../../../../common/hooks/useDevice.js';
import { useNotification } from '../../../../../../common/hooks/useNotification.js';
import usePublishGallery from '../../../../../../gallery/hooks/usePublishGallery.js';
import GalleryPublishTipModal from '../../../../../../gallery/views/GalleryPublishTipModal.js';
import { useUserStore } from '../../../../../../services/store/index.js';
const MobilePreview = dynamic(() => import('./mobile/index.js'), {
    ssr: false
});
const PcPreview = dynamic(() => import('./pc/index.js'), {
    ssr: false
});
export default function ImgVideoPreview({ imgVideoList, activeIndex, open, onClose }) {
    const { isMobile } = useDevice();
    const [popupConfirmObj, setPopupConfirmObj] = useState(null);
    const [publishState, setPublishState] = useState('info');
    const { publishing, publishGalleryList } = usePublishGallery();
    const t = useTranslations();
    const { msgId, selectedBot } = useContext(LUIButtonInteractionContext);
    const flagUserFirstPublishGallery = useUserStore(state => state.flagUserFirstPublishGallery);
    const publishGalleryHandle = useCallback((index) => {
        const imgItem = imgVideoList[index];
        const publishObj = {
            botId: `${selectedBot?.id}`,
            imageLink: imgItem.url,
            messageId: msgId,
            naturalHeight: imgItem.mediaFileMetadata?.height || 0,
            naturalWidth: imgItem.mediaFileMetadata?.width || 0
        };
        if (flagUserFirstPublishGallery) {
            publishGalleryList(publishSuccessCb, [publishObj]);
        }
        else {
            setPopupConfirmObj(publishObj);
        }
    }, [publishGalleryList, selectedBot, msgId, flagUserFirstPublishGallery]);
    const { success } = useNotification();
    const publishSuccessCb = useCallback(() => {
        if (publishState === 'info' && !flagUserFirstPublishGallery) {
            setPublishState('success');
        }
        else {
            success({
                content: t('chat.suc_send')
            });
            setPublishState('info');
            setPopupConfirmObj(null);
            onClose();
        }
    }, [setPopupConfirmObj, flagUserFirstPublishGallery, publishState]);
    const confirmHandler = useCallback(() => {
        if (publishState === 'success') {
            setPopupConfirmObj(null);
            onClose();
        }
        else {
            popupConfirmObj && publishGalleryList(publishSuccessCb, [popupConfirmObj]);
        }
    }, [publishState, publishGalleryList, publishSuccessCb]);
    return (_jsxs(_Fragment, { children: [imgVideoList.length > 0 && (_jsx(Modal, { open: open, onClose: onClose, contentClassName: "w-full h-full max-h-none p-0 rounded-none bg-beta-black-10", iconClassName: "text-icon-static hover:bg-transparent focus:bg-transparent active:bg-transparent", children: _jsx("div", { className: "overflow-hidden p-0", children: isMobile ? (_jsx(MobilePreview, { imgVideoList: imgVideoList, activeIndex: activeIndex, onClose: onClose, publishGalleryHandle: publishGalleryHandle, publishing: publishing })) : (_jsx(PcPreview, { imgVideoList: imgVideoList, activeIndex: activeIndex, onClose: onClose, publishGalleryHandle: publishGalleryHandle, publishing: publishing })) }) })), _jsx(GalleryPublishTipModal, { open: !!popupConfirmObj?.botId, onClose: () => {
                    setPopupConfirmObj(null);
                    publishState === 'success' && onClose();
                }, onConfirm: confirmHandler, publishState: publishState, publishing: publishing })] }));
}
