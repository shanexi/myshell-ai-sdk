import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useMemo } from 'react';
import { StaticContext } from '../../../../../chat-new/context/StaticContext.js';
import EnergyPack from '../../../../../chat-new/views/message-list/components/energy-pack/index.js';
import PassCard from '../../../../../chat-new/views/message-list/components/passcard/index.js';
import { useUserStore } from '../../../../../services/store/index.js';
const Footer = () => {
    const user = useUserStore(state => state.user);
    const token = useUserStore(state => state.token);
    const isVisitor = useUserStore(state => state.isVisitor);
    const isBasicUser = isVisitor === 2 && user?.level === 1;
    const energy = useUserStore(state => state.energy);
    const retriveEnergySuccess = useUserStore(state => state.retriveEnergySuccess);
    const { entityInfo } = useContext(StaticContext);
    const isEnoughEnergy = useMemo(() => {
        if (retriveEnergySuccess) {
            return energy >= (entityInfo.energyPerChat ?? 1);
        }
        return !retriveEnergySuccess;
    }, [retriveEnergySuccess, energy, entityInfo.energyPerChat]);
    const loginUserNoEnoughEnergy = !!token && !isEnoughEnergy;
    if (!loginUserNoEnoughEnergy) {
        return null;
    }
    return _jsx("div", { className: "pb-4 md:pb-6 px-0 md:px-[38px]", children: isBasicUser ? _jsx(PassCard, {}) : _jsx(EnergyPack, {}) });
};
export default Footer;
