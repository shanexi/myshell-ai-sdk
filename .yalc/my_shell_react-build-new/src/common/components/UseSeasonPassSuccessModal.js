"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UseSeasonPassSuccessModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const InlineVideoPlayer_1 = __importDefault(require("../../common/components/InlineVideoPlayer.js"));
const common_helper_1 = require("../../common/utils/common-helper.js");
const useGetEnergyInfo_1 = __importDefault(require("../../hooks/user/useGetEnergyInfo.js"));
const useUpdateUserProfile_1 = __importDefault(require("../../hooks/user/useUpdateUserProfile.js"));
const store_1 = require("../../services/store/index.js");
function UseSeasonPassSuccessModal({ isOpen, onClose, rewardInfo, isLoading = false }) {
    const t = (0, next_intl_1.useTranslations)('common');
    const rewardT = (0, next_intl_1.useTranslations)('reward_center.reward_redemption_content.rewards');
    const cT = (0, next_intl_1.useTranslations)('chat');
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const { queryUserProfile } = (0, useUpdateUserProfile_1.default)();
    const setNewlyPropsCount = (0, store_1.useTaskStore)(state => state.setNewlyPropsCount);
    const [querying, setQuerying] = (0, react_2.useState)(false);
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
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, onClose: onClose, size: "4xl", isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-white-opacity-95 dark:bg-black-opacity-95" }), (0, jsx_runtime_1.jsx)(react_1.ModalContent, { w: "350px", overflowX: "hidden", border: "none", boxShadow: "none", bg: "transparent", children: (0, jsx_runtime_1.jsx)(react_1.ModalBody, { p: 0, children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", alignItems: "center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-[6px] mx-[25px]", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl text-on-surface text-center", children: t('congratulations') }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", className: "text-secondary", textAlign: "center", children: cT('claim_season_pass_success_desc', {
                                            name: rewardInfo?.name
                                        }) })] }), (0, jsx_runtime_1.jsxs)(react_1.Box, { mt: "20px", className: "space-y-3", children: [(0, jsx_runtime_1.jsx)(react_1.Box, { className: "aspect-square", h: {
                                            base: '358px',
                                            md: '350px'
                                        }, rounded: "12px", overflow: "hidden", position: "relative", flexShrink: 0, children: (0, common_helper_1.isVideo)((0, common_helper_1.getFileExtension)(rewardInfo?.mediaUrl ?? '')) ? ((0, jsx_runtime_1.jsx)(InlineVideoPlayer_1.default, { src: (0, common_helper_1.getAssetsUrl)(rewardInfo?.mediaUrl, 'https://cdn.myshell.ai/') })) : ((0, jsx_runtime_1.jsx)(react_1.Image, { src: (0, common_helper_1.getAssetsUrl)(rewardInfo?.mediaUrl, 'https://cdn.myshell.ai/'), alt: "img" })) }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-1", children: (0, jsx_runtime_1.jsx)(react_1.Text, { textAlign: "center", className: "text-secondary", children: rewardInfo?.name }) })] }), (0, jsx_runtime_1.jsx)(react_1.Flex, { flexDirection: "column", mt: {
                                    base: '20px',
                                    md: '32px'
                                }, w: "full", children: (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", w: "full", px: "16px", h: "44px", className: "bg-primary", color: "white", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.08)", onClick: handleClose, isLoading: isLoading || querying, _hover: {
                                        bg: 'var(--primary)'
                                    }, children: (0, jsx_runtime_1.jsx)(react_1.Text, { fontWeight: "600", fontSize: "14px", lineHeight: "20px", children: t('got_it') }) }) })] }) }) })] }));
}
