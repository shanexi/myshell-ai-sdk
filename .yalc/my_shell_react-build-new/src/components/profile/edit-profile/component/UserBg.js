import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Center } from '@chakra-ui/react';
import clsx from 'clsx';
import Compressor from 'compressorjs';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import BotDetailBg from '@/common/assets/images/workshop/BotDetailBg.png';
import CameraIcon from '../../../../common/components/icons/workshop/tts/Camera.js';
import { BotPhotoTypeEnum } from '../../../../common/constants/enums/bot.js';
import { useNotification } from '../../../../common/hooks/useNotification.js';
import { getFileExtension } from '../../../../common/utils/common-helper.js';
import UserCropperModal from './UserCropperModal.js';
const AcceptedImageSuffixs = ['png', 'jpeg', 'jpg'];
export default function UserBg({ bgPhoto, onActionSuccess, loading, className, showUpload = false }) {
    const inputRef = useRef(null);
    const [file, setFile] = useState();
    const [cropperModalVisible, setCropperModalVisible] = useState(false);
    const { warning } = useNotification();
    const commonT = useTranslations('common');
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSuffix = getFileExtension(file.name);
            if (!AcceptedImageSuffixs.some(s => s === fileSuffix)) {
                warning({ content: commonT('unsupported_img_file_type') });
                return;
            }
            if (file.size > 1048576 * 5) {
                warning({ content: commonT('image_up_to_5m') });
                return;
            }
            if (file.size > 1048576 * 2) {
                new Compressor(file, {
                    quality: 0.6,
                    success(result) {
                        setFile(result);
                        setCropperModalVisible(true);
                    },
                    error(err) {
                        setFile(file);
                        setCropperModalVisible(true);
                    }
                });
            }
            else {
                setFile(file);
                setCropperModalVisible(true);
            }
        }
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: clsx('w-full relative', className ? className : 'h-[120px] md:max-h-[190px] md:h-[12.2vw]'), children: [loading ? (_jsx(Image, { alt: "user detail background image", src: BotDetailBg, fill: true, priority: true, className: "object-cover" })) : (_jsx(Image, { alt: "user detail background image", src: bgPhoto ? bgPhoto : BotDetailBg, fill: true, priority: true, className: "object-cover" })), showUpload && (_jsx(Center, { position: "absolute", w: "full", h: "full", children: _jsxs("label", { children: [_jsx(Box, { p: "8px 12px", bgColor: "white", boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.05)", rounded: "full", cursor: "pointer", children: _jsx(CameraIcon, { color: "var(--primary)", fontSize: "20px" }) }), _jsx("span", { className: "hidden", children: "\u9009\u62E9\u56FE\u7247\u4E0A\u4F20" }), _jsx("input", { ref: inputRef, type: "file", className: "hidden", accept: "image/png, image/jpeg", onChange: handleFileChange, disabled: loading })] }) }))] }), cropperModalVisible && (_jsx(UserCropperModal, { type: BotPhotoTypeEnum.BACKGROUND, file: file, open: cropperModalVisible, onClose: (needRefresh = false, data) => {
                    console.log('onClose', data);
                    setCropperModalVisible(false);
                    setFile(undefined);
                    needRefresh && onActionSuccess && data && onActionSuccess(data?.objectKey);
                } }))] }));
}
