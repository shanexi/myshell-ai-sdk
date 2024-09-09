import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import { PropTypeEnum } from '../../common/constants/enums/task.js';
import { getValueFromSubType } from '../../common/utils/reward-center/index.js';
import { useGlobalStore, useTaskStore } from '../../services/store/index.js';
import { useNotification } from './useNotification.js';
export default function useCheckEnergyPack() {
    const t = useTranslations('common');
    const { warning } = useNotification();
    const myProps = useTaskStore(state => state.myProps);
    const setNoEnergyWithUsablePropModalVisible = useGlobalStore(state => state.setNoEnergyWithUsablePropModalVisible);
    const usableEnergyPack = useMemo(() => {
        const ownEnergyPack = myProps.filter(prop => prop.propType === PropTypeEnum.energyPack && (!prop.endDate || dayjs().isBefore(dayjs(prop.endDate))));
        if (!ownEnergyPack.length) {
            return null;
        }
        else {
            return ownEnergyPack.reduce((min, current) => {
                return Number(getValueFromSubType(current?.subType)) < Number(getValueFromSubType(min?.subType))
                    ? current
                    : min;
            });
        }
    }, [myProps]);
    const getIsNoEnergy = useCallback(() => {
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
    const checkBeforePopupNoEnergy = useCallback(() => {
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
