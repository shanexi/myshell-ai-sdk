import { getUserProfile } from '../../apis/user.js';
import { useUserStore } from '../../services/store/index.js';
export default function useUpdateUserProfile() {
    const setUser = useUserStore(state => state.setUser);
    const queryUserProfile = async () => {
        try {
            const { data } = await getUserProfile();
            setUser(data);
            return data;
        }
        catch (e) {
            throw new Error(e.response.data.message);
        }
    };
    return {
        queryUserProfile
    };
}
