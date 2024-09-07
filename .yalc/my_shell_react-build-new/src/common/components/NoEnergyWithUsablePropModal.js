"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NoEnergyWithUsablePropModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const lowBattery_svg_1 = __importDefault(require("@/common/assets/icons/voice/lowBattery.svg"));
const useCheckEnergyPack_1 = __importDefault(require("../../common/hooks/useCheckEnergyPack.js"));
const useNotification_1 = require("../../common/hooks/useNotification.js");
const reward_center_1 = require("../../common/utils/reward-center/index.js");
const useUseProp_1 = __importDefault(require("../../hooks/rewards-center/useUseProp.js"));
const store_1 = require("../../services/store/index.js");
function NoEnergyWithUsablePropModal({ successCb }) {
    const [noEnergyWithUsablePropModalVisible, setNoEnergyWithUsablePropModalVisible] = [
        (0, store_1.useGlobalStore)(state => state.noEnergyWithUsablePropModalVisible),
        (0, store_1.useGlobalStore)(state => state.setNoEnergyWithUsablePropModalVisible)
    ];
    const { usableEnergyPack } = (0, useCheckEnergyPack_1.default)();
    const { warning, success } = (0, useNotification_1.useNotification)();
    const t = (0, next_intl_1.useTranslations)('common');
    const { acting, handleUseProp } = (0, useUseProp_1.default)();
    const handleCancel = () => {
        warning({
            content: t('no_enough_energy_for_current_action'),
            id: 'no_enough_energy_for_current_action'
        });
        setNoEnergyWithUsablePropModalVisible(false);
    };
    const usePropHandler = (0, react_2.useCallback)(() => {
        handleUseProp(usableEnergyPack.id, usableEnergyPack, 1, () => {
            setNoEnergyWithUsablePropModalVisible(false);
            successCb && successCb();
            success({
                content: t('usable_energy_pack.success_tip')
            });
        });
    }, [handleUseProp, setNoEnergyWithUsablePropModalVisible, successCb, usableEnergyPack]);
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: noEnergyWithUsablePropModalVisible, onClose: () => {
            setNoEnergyWithUsablePropModalVisible(false);
        }, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, {}), (0, jsx_runtime_1.jsxs)(react_1.ModalContent, { p: "16px", rounded: "24px", className: "bg-surface", children: [(0, jsx_runtime_1.jsx)(react_1.ModalHeader, { p: 0, pt: "4px", children: (0, jsx_runtime_1.jsx)(react_1.Box, { p: 2, children: (0, jsx_runtime_1.jsx)(image_1.default, { src: lowBattery_svg_1.default, alt: "low battery", className: "w-[40px] h-[40px]", style: {
                                    borderRadius: 'var(--redius-12, 12px)',
                                    background: 'var(--white, #FFF)'
                                } }) }) }), (0, jsx_runtime_1.jsxs)(react_1.ModalBody, { mt: "8px", p: 0, className: "space-y-2 text-on-surface", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-[20px] leading-[28px] font-[400]", children: t('usable_energy_pack.header') }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", children: t('usable_energy_pack.desc', {
                                    value: (0, reward_center_1.getValueFromSubType)(usableEnergyPack.subType)
                                }) })] }), (0, jsx_runtime_1.jsx)(react_1.ModalFooter, { p: 0, mt: 4, children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { w: "full", justifyContent: "space-around", className: "space-x-4", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", border: "1px solid var(--border)", boxShadow: "0px 1px 0px 0px #0000000D", rounded: "full", w: "50%", h: "44px", p: "10px 24px", className: "text-on-surface", onClick: handleCancel, children: t('cancel') }), (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", rounded: "full", className: "bg-primary", _hover: {
                                        bgColor: 'var(--primary)'
                                    }, display: "flex", justifyContent: "center", alignItems: "center", color: "white", p: "10px 24px", w: "50%", h: "44px", isLoading: acting, onClick: usePropHandler, children: t('confirm') })] }) })] })] }));
}
