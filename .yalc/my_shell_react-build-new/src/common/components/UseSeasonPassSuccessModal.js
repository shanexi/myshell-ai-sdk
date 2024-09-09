import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Flex, Image, Modal, ModalBody, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import InlineVideoPlayer from '../../common/components/InlineVideoPlayer.js';
import { getAssetsUrl, getFileExtension, isVideo } from '../../common/utils/common-helper.js';
import useGetEnergyInfo from '../../hooks/user/useGetEnergyInfo.js';
import useUpdateUserProfile from '../../hooks/user/useUpdateUserProfile.js';
import { useTaskStore } from '../../services/store/index.js';
export default function UseSeasonPassSuccessModal({ isOpen, onClose, rewardInfo, isLoading = false }) {
    const t = useTranslations('common');
    const rewardT = useTranslations('reward_center.reward_redemption_content.rewards');
    const cT = useTranslations('chat');
    const { getEnergyInfo } = useGetEnergyInfo();
    const { queryUserProfile } = useUpdateUserProfile();
    const setNewlyPropsCount = useTaskStore(state => state.setNewlyPropsCount);
    const [querying, setQuerying] = useState(false);
    const handleClose = async () => {
        setNewlyPropsCount(0);
        try {
            setQuerying(true);
            await Promise.all([getEnergyInfo(), queryUserProfile()]);
            onClose();
        }
        catch (e) {
        }
        finally {
            setQuerying(false);
        }
    };
    return (_jsxs(Modal, { isOpen: isOpen, onClose: onClose, size: "4xl", isCentered: true, children: [_jsx(ModalOverlay, { className: "bg-white-opacity-95 dark:bg-black-opacity-95" }), _jsx(ModalContent, { w: "350px", overflowX: "hidden", border: "none", boxShadow: "none", bg: "transparent", children: _jsx(ModalBody, { p: 0, children: _jsxs(Flex, { flexDirection: "column", alignItems: "center", children: [_jsxs("div", { className: "space-y-[6px] mx-[25px]", children: [_jsx("h2", { className: "text-2xl text-on-surface text-center", children: t('congratulations') }), _jsx(Text, { fontSize: "14px", lineHeight: "20px", className: "text-secondary", textAlign: "center", children: cT('claim_season_pass_success_desc', {
                                            name: rewardInfo?.name
                                        }) })] }), _jsxs(Box, { mt: "20px", className: "space-y-3", children: [_jsx(Box, { className: "aspect-square", h: {
                                            base: '358px',
                                            md: '350px'
                                        }, rounded: "12px", overflow: "hidden", position: "relative", flexShrink: 0, children: isVideo(getFileExtension(rewardInfo?.mediaUrl ?? '')) ? (_jsx(InlineVideoPlayer, { src: getAssetsUrl(rewardInfo?.mediaUrl, 'https://cdn.myshell.ai/') })) : (_jsx(Image, { src: getAssetsUrl(rewardInfo?.mediaUrl, 'https://cdn.myshell.ai/'), alt: "img" })) }), _jsx("div", { className: "space-y-1", children: _jsx(Text, { textAlign: "center", className: "text-secondary", children: rewardInfo?.name }) })] }), _jsx(Flex, { flexDirection: "column", mt: {
                                    base: '20px',
                                    md: '32px'
                                }, w: "full", children: _jsx(Button, { variant: "unstyled", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", w: "full", px: "16px", h: "44px", className: "bg-primary", color: "white", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.08)", onClick: handleClose, isLoading: isLoading || querying, _hover: {
                                        bg: 'var(--primary)'
                                    }, children: _jsx(Text, { fontWeight: "600", fontSize: "14px", lineHeight: "20px", children: t('got_it') }) }) })] }) }) })] }));
}
