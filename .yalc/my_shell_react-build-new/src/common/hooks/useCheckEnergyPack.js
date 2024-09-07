"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useCheckEnergyPack;
const dayjs_1 = __importDefault(require("dayjs"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const task_1 = require("../../common/constants/enums/task.js");
const reward_center_1 = require("../../common/utils/reward-center/index.js");
const store_1 = require("../../services/store/index.js");
const useNotification_1 = require("./useNotification.js");
function useCheckEnergyPack() {
    const t = (0, next_intl_1.useTranslations)('common');
    const { warning } = (0, useNotification_1.useNotification)();
    const myProps = (0, store_1.useTaskStore)(state => state.myProps);
    const setNoEnergyWithUsablePropModalVisible = (0, store_1.useGlobalStore)(state => state.setNoEnergyWithUsablePropModalVisible);
    const usableEnergyPack = (0, react_1.useMemo)(() => {
        const ownEnergyPack = myProps.filter(prop => prop.propType === task_1.PropTypeEnum.energyPack && (!prop.endDate || (0, dayjs_1.default)().isBefore((0, dayjs_1.default)(prop.endDate))));
        if (!ownEnergyPack.length) {
            return null;
        }
        else {
            return ownEnergyPack.reduce((min, current) => {
                return Number((0, reward_center_1.getValueFromSubType)(current?.subType)) < Number((0, reward_center_1.getValueFromSubType)(min?.subType))
                    ? current
                    : min;
            });
        }
    }, [myProps]);
    const getIsNoEnergy = (0, react_1.useCallback)(() => {
        if (usableEnergyPack) {
            return true;
        }
        else {
            warning({
                content: t('no_enough_energy_for_current_action'),
                id: 'reach-limitation-warning'
            });
            return false;
        }
    }, [setNoEnergyWithUsablePropModalVisible, usableEnergyPack]);
    const checkBeforePopupNoEnergy = (0, react_1.useCallback)(() => {
        if (usableEnergyPack) {
            setNoEnergyWithUsablePropModalVisible(true);
        }
        else {
            warning({
                content: t('no_enough_energy_for_current_action'),
                id: 'reach-limitation-warning'
            });
            return;
        }
    }, [setNoEnergyWithUsablePropModalVisible, usableEnergyPack]);
    return {
        usableEnergyPack,
        checkBeforePopupNoEnergy,
        getIsNoEnergy
    };
}
