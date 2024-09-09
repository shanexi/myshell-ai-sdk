'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { usePathLocale } from '../../common/hooks/usePathLocale.js';
const formatCount = (count) => {
    const num = Number(count);
    if (num > 1000) {
        return `${(num / 1000).toFixed(1)}k`;
    }
    return num;
};
function FollowInfo({ user }) {
    const { isMobile } = usePathLocale();
    const t = useTranslations('profile');
    if (!user)
        return null;
    return (_jsxs("div", { className: "text-base flex items-center", children: [_jsx("span", { className: "text-secondary mr-1", children: t('follower') }), _jsx("span", { className: "text-on-surface font-medium", children: formatCount(user?.fansCount) }), _jsx("p", { className: "border-r mx-2 h-[16px]" }), _jsx("span", { className: "text-secondary mr-1", children: t('following') }), _jsx("span", { className: "text-on-surface font-medium", children: formatCount(user?.followedCount) })] }));
}
export default FollowInfo;
