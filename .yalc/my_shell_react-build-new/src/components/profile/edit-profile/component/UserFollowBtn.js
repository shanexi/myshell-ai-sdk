"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFollowBtn = UserFollowBtn;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const user_1 = require("../../../../apis/user.js");
const button_1 = require("../../../../common/components/ui/button.js");
const user_2 = require("../../../../common/constants/enums/user.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const useSensors_1 = require("../../../../lib/sensors/useSensors.js");
const utils_1 = require("../../../../lib/utils.js");
const store_1 = require("../../../../services/store/index.js");
function UserFollowBtn({ detailData, followCallback, size = 'lg', className }) {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [following, setFollowing] = (0, react_1.useState)(detailData?.followStatus === user_2.FollowStatus.FOLLOWED);
    const setUser = (0, store_1.useUserStore)(state => state.setUser);
    const t = (0, next_intl_1.useTranslations)('profile');
    const requestT = (0, next_intl_1.useTranslations)('request');
    const token = (0, store_1.useUserStore)(state => state.token);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const { success, warning } = (0, useNotification_1.useNotification)();
    const sensors = (0, useSensors_1.useSensors)();
    const followHandle = (0, react_1.useCallback)(async () => {
        if (!token) {
            toggleLoginModal(true);
            return;
        }
        if ((detailData && !detailData.id) || loading)
            return;
        setLoading(true);
        const isFollow = !following;
        const res = await (0, user_1.setUserFollow)(`${detailData?.id}`, isFollow);
        if (res.success) {
            setFollowing(isFollow);
            followCallback && followCallback(isFollow);
            setLoading(false);
            const { data } = await (0, user_1.getUserProfile)();
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
    return ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: following ? 'gray' : 'brand', className: (0, utils_1.cn)('px-6', className), size: size, onClick: () => {
            followHandle();
        }, loading: loading, tabIndex: -1, autoFocus: false, children: following ? t('following') : t('follow') }));
}
