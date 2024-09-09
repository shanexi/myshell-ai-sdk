import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { setUserFollow, getUserProfile } from '../../../../apis/user.js';
import { Button } from '../../../../common/components/ui/button.js';
import { FollowStatus } from '../../../../common/constants/enums/user.js';
import { useNotification } from '../../../../common/hooks/useNotification.js';
import { useSensors } from '../../../../lib/sensors/useSensors.js';
import { cn } from '../../../../lib/utils.js';
import { useUserStore, useGlobalStore } from '../../../../services/store/index.js';
export function UserFollowBtn({ detailData, followCallback, size = 'lg', className }) {
    const [loading, setLoading] = useState(false);
    const [following, setFollowing] = useState(detailData?.followStatus === FollowStatus.FOLLOWED);
    const setUser = useUserStore(state => state.setUser);
    const t = useTranslations('profile');
    const requestT = useTranslations('request');
    const token = useUserStore(state => state.token);
    const toggleLoginModal = useGlobalStore(state => state.toggleLoginModal);
    const { success, warning } = useNotification();
    const sensors = useSensors();
    const followHandle = useCallback(async () => {
        if (!token) {
            toggleLoginModal(true);
            return;
        }
        if ((detailData && !detailData.id) || loading)
            return;
        setLoading(true);
        const isFollow = !following;
        const res = await setUserFollow(`${detailData?.id}`, isFollow);
        if (res.success) {
            setFollowing(isFollow);
            followCallback && followCallback(isFollow);
            setLoading(false);
            const { data } = await getUserProfile();
            setUser(data);
            if (isFollow) {
                sensors.track('FollowCreator', {
                    creator_id: data?.id,
                    creator_name: data?.name
                });
            }
        }
        else {
            warning({
                content: requestT('error.common')
            });
            setLoading(false);
        }
    }, [detailData, following, loading, token]);
    return (_jsx(Button, { variant: "primary", color: following ? 'gray' : 'brand', className: cn('px-6', className), size: size, onClick: () => {
            followHandle();
        }, loading: loading, tabIndex: -1, autoFocus: false, children: following ? t('following') : t('follow') }));
}
