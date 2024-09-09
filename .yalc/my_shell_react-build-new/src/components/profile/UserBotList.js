'use client';
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { cn } from '../../lib/utils.js';
import NormalCard from '../../common/components/NormalCard.js';
import { NormalCardSkeleton } from '../skeleton/common/NormalCardSkeleton.js';
function UserBotList({ bots, loading, disableJumpToChat, onBotClick, selectedBotId, containerClassName, itemBoxClassName, itemLinkClassName, itemDividerClassName }) {
    const t = useTranslations('profile');
    const botList = bots?.map(item => {
        return {
            title: item.name,
            description: item.description,
            logoUrl: item.logoUrl,
            id: item.id,
            clickUrl: `/chat/${item.id}`,
            clickMobileUrl: `/chat/${item.id}`,
            type: 'BOT'
        };
    }) || [];
    return (_jsx(_Fragment, { children: loading && bots.length === 0 ? (_jsx("div", { className: cn('grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2', containerClassName), children: Array(4)
                .fill(1)
                ?.map((item, index) => {
                return _jsx(NormalCardSkeleton, { size: "sm" }, `bots-skeleton-${index}`);
            }) })) : (_jsx("div", { className: cn('grid grid-cols-1 gap-x-4 gap-y-2', bots?.length > 0 ? 'md:grid-cols-2' : '', containerClassName), children: botList?.length > 0 ? (_jsx(_Fragment, { children: botList?.map((item, index) => {
                    return (_jsx(NormalCard, { className: itemBoxClassName, linkClassName: itemLinkClassName, dividerClassName: cn(selectedBotId === item.id ? 'border-primary' : '', itemDividerClassName), from: "Aipp Launch", size: "sm", item: item, isLine: true, disableJumpToChat: disableJumpToChat, onClick: () => {
                            const bot = bots.find(({ id }) => id === item.id);
                            if (!bot) {
                                return;
                            }
                            onBotClick?.(bot);
                        } }, `bots-common-item-${index}`));
                }) })) : (_jsx("div", { className: "text-on-surface h-[120px] flex justify-center items-center", children: t('no_public_bots') }, "no_public_bots")) })) }));
}
export default UserBotList;
