"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const alert_1 = require("../../../../../common/components/ui/alert.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const link_1 = __importDefault(require("../../../../../common/components/ui/link.js"));
const useCheckEnergyPack_1 = __importDefault(require("../../../../../common/hooks/useCheckEnergyPack.js"));
const reward_center_1 = require("../../../../../common/utils/reward-center/index.js");
const SuccessTipModal_1 = __importDefault(require("../../../../../components/rewards-center/my-props/components/SuccessTipModal.js"));
const useUseProp_1 = __importDefault(require("../../../../../hooks/rewards-center/useUseProp.js"));
const useGetEnergyInfo_1 = __importDefault(require("../../../../../hooks/user/useGetEnergyInfo.js"));
const EnergyPack = ({ onClose, type }) => {
    const { acting: usingProp, handleUseProp } = (0, useUseProp_1.default)();
    const tempEnergyItem = (0, react_1.useRef)();
    const { usableEnergyPack } = (0, useCheckEnergyPack_1.default)();
    const commonT = (0, next_intl_1.useTranslations)('common');
    const rT = (0, next_intl_1.useTranslations)('reward_center');
    const [energyPackUsedModalVisible, setEnergyPackUsedModalVisible] = (0, react_1.useState)(false);
    const [beforeCloseLoading, setBeforeCloseLoading] = (0, react_1.useState)(false);
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const usePropHandler = (0, react_1.useCallback)(() => {
        tempEnergyItem.current = usableEnergyPack;
        handleUseProp(usableEnergyPack.id, usableEnergyPack, 1, () => {
            setEnergyPackUsedModalVisible(true);
        });
    }, [handleUseProp, usableEnergyPack]);
    const handleClose = (0, react_1.useCallback)(async () => {
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [usableEnergyPack ? ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "warning", className: "md:mx-10", children: [(0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: commonT('usable_energy_pack.desc', {
                            value: (0, reward_center_1.getValueFromSubType)(usableEnergyPack.subType)
                        }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", color: "warning", onClick: usePropHandler, loading: usingProp, className: "shrink-0", children: commonT('use') })] })) : ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "warning", className: "md:mx-10", children: [(0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: commonT(type === 'action' ? 'action_energy_pack_in_reward_center' : 'explore_energy_pack_in_reward_center') }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/rewards-center/reward-redemption", className: "flex-1 md:flex-none", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", color: "warning", className: "w-full", children: rT('title') }) })] })), energyPackUsedModalVisible && ((0, jsx_runtime_1.jsx)(SuccessTipModal_1.default, { isOpen: energyPackUsedModalVisible, onClose: handleClose, rewardInfo: tempEnergyItem.current, count: 1, isLoading: beforeCloseLoading }))] }));
};
exports.default = EnergyPack;
