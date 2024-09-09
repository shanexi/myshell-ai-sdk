import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Text } from '@chakra-ui/react';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../apis/user.js';
import { Modal } from '../../common/components/ui/modal.js';
import { usePathLocale } from '../../common/hooks/usePathLocale.js';
import { cn } from '../../lib/utils.js';
import { useGlobalStore } from '../../services/store/index.js';
import UserDetail from './UserDetail.js';
export default function UserDetailModal({ isOpen, onClose, detailData, userName, nameTag, defaultTab }) {
    const [detail, setDetail] = useState(detailData);
    const [isNotFound, setIsNotFound] = useState(false);
    const { isMobile } = usePathLocale();
    const t = useTranslations('profile');
    const commonT = useTranslations('common');
    const isOpenLoginModal = useGlobalStore(state => state.isOpenLoginModal);
    const emailConnectLoading = useGlobalStore(state => state.emailConnectLoading);
    const getUserHandle = async () => {
        const res = await getUserProfile({ name: userName, nameTag });
        if (res.success) {
            setDetail(res.data);
            setIsNotFound(false);
        }
        else {
            setIsNotFound(true);
        }
    };
    useEffect(() => {
        if (!detailData?.id && !!userName && !!nameTag) {
            getUserHandle();
        }
    }, [userName, nameTag]);
    const followCallback = () => {
        getUserHandle();
    };
    if (isNotFound) {
        return (_jsx(Modal, { open: isOpen, onClose: onClose, contentClassName: "w-[90%] md:w-[380px] p-4 z-[120]", overlayClassName: "z-[120]", children: _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx("div", { className: "w-12 h-12 rounded-full flex items-center justify-center bg-[#CCD4FF] dark:bg-[#2C334F] border-[6px] border-[#F2F4FE] dark:border-[#292C38] flex-shrink-0 ", children: _jsx(InformationCircleIcon, { className: "w-6 h-6 stroke-primary" }) }), _jsxs("div", { className: "flex flex-col space-y-2 text-on-surface", children: [_jsx("h2", { className: "text-xl text-on-surface", children: t('user_not_found_title') }), _jsx(Text, { fontSize: "14px", lineHeight: "20px", className: "text-secondary", children: t('user_not_found_content') })] }), _jsx(Button, { variant: "unstyled", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.08)", color: "white", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", className: "mt-4 w-full bg-primary h-[44px] outline-none px-6 py-2.5 font-bold", _loading: {
                            _hover: {
                                bgColor: '#3E5CFA'
                            }
                        }, onClick: onClose, children: commonT('confirm') })] }) }));
    }
    if (detail) {
        return (_jsx(Modal, { open: isOpenLoginModal || emailConnectLoading ? false : isOpen, onClose: onClose, contentClassName: cn('overflow-hidden shadow bg-transparent', isMobile ? 'w-full h-full' : 'w-[80vw] max-w-[880px] min-h-[418px] h-[90vh] max-h-[800px] rounded-4xl'), children: _jsx(UserDetail, { detailData: detail, showInsideScroller: true, showTopActions: true, onClose: onClose, followCallback: followCallback, defaultTab: defaultTab }) }));
    }
    return null;
}
