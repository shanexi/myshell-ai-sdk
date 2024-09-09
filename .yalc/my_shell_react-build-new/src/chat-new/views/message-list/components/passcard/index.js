"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const useRedeemAndUseSeasonPass_1 = __importDefault(require("../../../../../chat/views/hooks/useRedeemAndUseSeasonPass.js"));
const UseSeasonPassSuccessModal_1 = __importDefault(require("../../../../../common/components/UseSeasonPassSuccessModal.js"));
const alert_1 = require("../../../../../common/components/ui/alert.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const useSeason_1 = __importDefault(require("../../../../../hooks/rewards-center/useSeason.js"));
const useGetEnergyInfo_1 = __importDefault(require("../../../../../hooks/user/useGetEnergyInfo.js"));
const useUpdateUserProfile_1 = __importDefault(require("../../../../../hooks/user/useUpdateUserProfile.js"));
const PassCard = ({ onClose, type }) => {
    const t = (0, next_intl_1.useTranslations)('chat');
    const { seasons } = (0, useSeason_1.default)();
    const [seasonPassUseSuccessModalVisible, setSeasonPassUseSuccessModalVisible] = (0, react_1.useState)(false);
    const [beforeCloseLoading, setBeforeCloseLoading] = (0, react_1.useState)(false);
    const [usedItem, setUsedItem] = (0, react_1.useState)();
    const { acting, handleRedeemAndUseSeasonPass } = (0, useRedeemAndUseSeasonPass_1.default)();
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const { queryUserProfile } = (0, useUpdateUserProfile_1.default)();
    const handleClaimSeasonPasscard = () => {
        handleRedeemAndUseSeasonPass((usedItem) => {
            setUsedItem(usedItem);
            setSeasonPassUseSuccessModalVisible(true);
        });
    };
    const handleClose = async () => {
        try {
            setBeforeCloseLoading(true);
            await Promise.all([getEnergyInfo(), queryUserProfile()]);
            setSeasonPassUseSuccessModalVisible(false);
            onClose?.();
        }
        catch (e) {
        }
        finally {
            setBeforeCloseLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "warning", className: "md:mx-10", children: [(0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: type === 'action' ? t('action_claim_season_passcard_tip') : t('claim_season_passcard_tip') }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", color: "warning", onClick: handleClaimSeasonPasscard, className: "flex-1 md:flex-none", loading: acting, children: t('claim_season_passcard_btn_text') })] }), seasonPassUseSuccessModalVisible && ((0, jsx_runtime_1.jsx)(UseSeasonPassSuccessModal_1.default, { isOpen: seasonPassUseSuccessModalVisible, onClose: handleClose, rewardInfo: usedItem, isLoading: beforeCloseLoading }))] }));
};
exports.default = PassCard;
