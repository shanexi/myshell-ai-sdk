"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HoldersList;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const apiTypes_1 = require("../../../../../../../apis/apiTypes.js");
const user_1 = require("../../../../../../../apis/user.js");
const flash_svg_1 = __importDefault(require("@/assets/icons/web3/flash.svg"));
const avatar_1 = require("../../../../../../../common/components/ui/avatar.js");
const button_1 = require("../../../../../../../common/components/ui/button.js");
const typography_1 = require("../../../../../../../common/components/ui/typography.js");
const useNotification_1 = require("../../../../../../../common/hooks/useNotification.js");
const identityService_1 = require("../../../../../../../common/services/identityService.js");
const common_helper_1 = require("../../../../../../../common/utils/common-helper.js");
const utils_1 = require("../../../../../../../lib/utils.js");
function HoldersList({ holders }) {
    const t = (0, next_intl_1.useTranslations)('share_key.stake_earn');
    const [localHolders, setLocalHolders] = (0, react_1.useState)(holders);
    (0, react_1.useEffect)(() => {
        setLocalHolders(holders);
    }, [holders]);
    const renderEmpty = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-agent-empty flex flex-col items-center justify-center absolute", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: flash_svg_1.default, width: 32, height: 32, alt: "empty" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-center text-xl", weight: "semibold", color: "default", children: t('no_active_bids') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-center", size: "sm", color: "subtlest", children: t('earliest') })] }));
    };
    return ((0, jsx_runtime_1.jsx)("ul", { className: "w-full flex flex-col gap-4 pb-4 pt-[22px]", children: localHolders.length === 0
            ? renderEmpty()
            : holders?.map(item => {
                const { holder, walletAddress, holdCount } = item;
                return ((0, jsx_runtime_1.jsx)(HolderItem, { holder: holder, walletAddress: walletAddress, holdCount: holdCount, isUnspecified: false, localHolders: localHolders, setLocalHolders: setLocalHolders }, holder?.id));
            }) }));
}
function HolderItem({ holder, walletAddress, holdCount, isUnspecified, localHolders, setLocalHolders }) {
    const t = (0, next_intl_1.useTranslations)();
    const { warning, error: errorToast } = (0, useNotification_1.useNotification)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [following, setFollowing] = (0, react_1.useState)(holder?.followStatus === apiTypes_1.FollowStatus.FOLLOWED);
    const [isSelf, setIsSelf] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const userId = identityService_1.identityService.getUserId();
        if (userId === holder?.id) {
            setIsSelf(true);
        }
    }, []);
    const followHandle = (0, react_1.useCallback)(async (holder) => {
        try {
            if (!holder)
                return;
            setLoading(true);
            const isFollow = !following;
            const res = await (0, user_1.setUserFollow)(`${holder?.id}`, isFollow);
            if (res.success) {
                setFollowing(isFollow);
                const currentHolder = localHolders.find(item => item.holder?.id === holder?.id);
                if (currentHolder) {
                    currentHolder.holder.followStatus = isFollow ? apiTypes_1.FollowStatus.FOLLOWED : apiTypes_1.FollowStatus.NOT_FOLLOWED;
                    setLocalHolders([...localHolders]);
                }
            }
            else {
                if (res.msg === "can't follow self") {
                    warning({
                        content: t('request.error.cant_follow_self')
                    });
                    return;
                }
                warning({
                    content: t('request.error.common')
                });
            }
        }
        catch (error) {
            errorToast({
                content: t('request.error.common')
            });
        }
        finally {
            setLoading(false);
        }
    }, [following]);
    return ((0, jsx_runtime_1.jsxs)("li", { className: "flex w-holders items-center justify-between hover:bg-surface-hovered px-2 py-1 translate-x-[-8px] rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2.5 max-w-[60%] md:max-w-[100%]", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: (0, common_helper_1.getAssetsUrl)(holder?.avatar), alt: holder?.avatar, className: "w-8 h-8 rounded-lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "default", weight: "medium", lineClamp: 1, className: "max-w-[200px] -translate-y-1", children: holder?.name || (0, common_helper_1.formatWalletAddress)(walletAddress) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-xs", color: "brand", weight: "medium", children: t.rich('reward_center.aipp.has_shares', {
                                    count: holdCount
                                }) })] })] }), !isUnspecified && holder && !isSelf && ((0, jsx_runtime_1.jsx)(button_1.Button, { className: (0, utils_1.cn)('w-[98px] h-8 dark:shadow-none shadow-background-default', following
                    ? 'bg-surface-search-field hover:bg-surface-search-field active:bg-surface-search-field border border-default'
                    : 'bg-surface-primary-default'), loading: loading, onClick: () => followHandle(holder), children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: following ? 'subtle' : 'static', weight: "medium", children: following ? t('profile.following') : t('profile.follow') }) }))] }, holder?.id));
}
