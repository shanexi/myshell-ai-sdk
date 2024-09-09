import { useState } from 'react';
import { claimAndUseSeasonPass } from '../../../apis/user.js';
import { useNotification } from '../../../common/hooks/useNotification.js';
export default function useRedeemAndUseSeasonPass() {
    const [acting, setActing] = useState(false);
    const { warning } = useNotification();
    const handleRedeemAndUseSeasonPass = async (successCb) => {
        try {
            setActing(true);
            const { success, data, msg } = await claimAndUseSeasonPass();
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            successCb && successCb(data);
        }
        catch (e) {
        }
        finally {
            setActing(false);
        }
    };
    return {
        acting,
        handleRedeemAndUseSeasonPass
    };
}
