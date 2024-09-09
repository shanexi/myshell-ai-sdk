import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import { Alert, AlertDescription } from '../../../../../common/components/ui/alert.js';
import { Button } from '../../../../../common/components/ui/button.js';
import Link from '../../../../../common/components/ui/link.js';
import useCheckEnergyPack from '../../../../../common/hooks/useCheckEnergyPack.js';
import { getValueFromSubType } from '../../../../../common/utils/reward-center/index.js';
import SuccessTipModal from '../../../../../components/rewards-center/my-props/components/SuccessTipModal.js';
import useUseProp from '../../../../../hooks/rewards-center/useUseProp.js';
import useGetEnergyInfo from '../../../../../hooks/user/useGetEnergyInfo.js';
const EnergyPack = ({ onClose, type }) => {
    const { acting: usingProp, handleUseProp } = useUseProp();
    const tempEnergyItem = useRef();
    const { usableEnergyPack } = useCheckEnergyPack();
    const commonT = useTranslations('common');
    const rT = useTranslations('reward_center');
    const [energyPackUsedModalVisible, setEnergyPackUsedModalVisible] = useState(false);
    const [beforeCloseLoading, setBeforeCloseLoading] = useState(false);
    const { getEnergyInfo } = useGetEnergyInfo();
    const usePropHandler = useCallback(() => {
        tempEnergyItem.current = usableEnergyPack;
        handleUseProp(usableEnergyPack.id, usableEnergyPack, 1, () => {
            setEnergyPackUsedModalVisible(true);
        });
    }, [handleUseProp, usableEnergyPack]);
    const handleClose = useCallback(async () => {
        try {
            setBeforeCloseLoading(true);
            await getEnergyInfo();
            onClose?.();
            tempEnergyItem.current = undefined;
            setEnergyPackUsedModalVisible(false);
        }
        catch (e) {
        }
        finally {
            setBeforeCloseLoading(false);
        }
    }, [getEnergyInfo]);
    return (_jsxs(_Fragment, { children: [usableEnergyPack ? (_jsxs(Alert, { variant: "warning", className: "md:mx-10", children: [_jsx(AlertDescription, { children: commonT('usable_energy_pack.desc', {
                            value: getValueFromSubType(usableEnergyPack.subType)
                        }) }), _jsx(Button, { size: "md", color: "warning", onClick: usePropHandler, loading: usingProp, className: "shrink-0", children: commonT('use') })] })) : (_jsxs(Alert, { variant: "warning", className: "md:mx-10", children: [_jsx(AlertDescription, { children: commonT(type === 'action' ? 'action_energy_pack_in_reward_center' : 'explore_energy_pack_in_reward_center') }), _jsx(Link, { href: "/rewards-center/reward-redemption", className: "flex-1 md:flex-none", children: _jsx(Button, { size: "md", color: "warning", className: "w-full", children: rT('title') }) })] })), energyPackUsedModalVisible && (_jsx(SuccessTipModal, { isOpen: energyPackUsedModalVisible, onClose: handleClose, rewardInfo: tempEnergyItem.current, count: 1, isLoading: beforeCloseLoading }))] }));
};
export default EnergyPack;
