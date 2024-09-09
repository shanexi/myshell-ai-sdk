import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import useRedeemAndUseSeasonPass from '../../../../../chat/views/hooks/useRedeemAndUseSeasonPass.js';
import UseSeasonPassSuccessModal from '../../../../../common/components/UseSeasonPassSuccessModal.js';
import { Alert, AlertDescription } from '../../../../../common/components/ui/alert.js';
import { Button } from '../../../../../common/components/ui/button.js';
import useSeason from '../../../../../hooks/rewards-center/useSeason.js';
import useGetEnergyInfo from '../../../../../hooks/user/useGetEnergyInfo.js';
import useUpdateUserProfile from '../../../../../hooks/user/useUpdateUserProfile.js';
const PassCard = ({ onClose, type }) => {
    const t = useTranslations('chat');
    const { seasons } = useSeason();
    const [seasonPassUseSuccessModalVisible, setSeasonPassUseSuccessModalVisible] = useState(false);
    const [beforeCloseLoading, setBeforeCloseLoading] = useState(false);
    const [usedItem, setUsedItem] = useState();
    const { acting, handleRedeemAndUseSeasonPass } = useRedeemAndUseSeasonPass();
    const { getEnergyInfo } = useGetEnergyInfo();
    const { queryUserProfile } = useUpdateUserProfile();
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
    return (_jsxs(_Fragment, { children: [_jsxs(Alert, { variant: "warning", className: "md:mx-10", children: [_jsx(AlertDescription, { children: type === 'action' ? t('action_claim_season_passcard_tip') : t('claim_season_passcard_tip') }), _jsx(Button, { size: "md", color: "warning", onClick: handleClaimSeasonPasscard, className: "flex-1 md:flex-none", loading: acting, children: t('claim_season_passcard_btn_text') })] }), seasonPassUseSuccessModalVisible && (_jsx(UseSeasonPassSuccessModal, { isOpen: seasonPassUseSuccessModalVisible, onClose: handleClose, rewardInfo: usedItem, isLoading: beforeCloseLoading }))] }));
};
export default PassCard;
