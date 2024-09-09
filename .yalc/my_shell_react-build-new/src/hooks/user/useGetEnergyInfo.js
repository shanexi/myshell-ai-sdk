import { getUserEnergyInfo } from '../../apis/user.js';
import { useUserStore } from '../../services/store/index.js';
export default function useGetEnergyInfo() {
    const setEnergyInfo = useUserStore(state => state.setEnergyInfo);
    const userId = useUserStore(state => state.userId);
    const getEnergyInfo = async (needSet = true) => {
        try {
            const { data } = await getUserEnergyInfo(userId);
            needSet && setEnergyInfo(data);
        }
        catch (e) {
        }
    };
    return {
        getEnergyInfo
    };
}
