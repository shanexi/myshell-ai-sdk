import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { usePathLocale } from '../../common/hooks/usePathLocale.js';
import TryTTSBtn from '../../components/workshop/widget-detail/detail/TryTTSBtn.js';
import { cn } from '../../lib/utils.js';
import { Tags } from './Tags.js';
import { Avatar } from './ui/avatar.js';
import { Button } from './ui/button.js';
import { Link } from './ui/link.js';
import { Description, Text } from './ui/typography.js';
function NormalCard(props) {
    const { item, isLine, showChat, size = 'default', className, linkClassName, inBox, showTags, setShowUserDetail, from, disableJumpToChat, onClick, dividerClassName } = props;
    const { isMobile } = usePathLocale();
    const t = useTranslations();
    const router = useRouter();
    const [buttonUrl, clickUrl] = useMemo(() => {
        return [
            item?.buttonUrl
                ? `${item?.buttonUrl}${item?.buttonUrl?.includes('?') ? '&' : '?'}${from ? `from=${from}` : ''}`
                : item?.buttonUrl,
            item?.clickUrl
                ? `${item?.clickUrl}${item?.clickUrl.includes('?') ? '&' : '?'}${from ? `from=${from}` : ''}`
                : item?.clickUrl
        ];
    }, [item?.buttonUrl, item?.clickUrl, from]);
    return (_jsxs("div", { className: cn('normal-item w-full cursor-pointer rounded-xl overflow-hidden', className), onClick: onClick ? () => onClick(item?.id) : undefined, children: [_jsxs(Link, { className: cn('w-full px-0 md:px-2.5 flex flex-row justify-start items-center rounded-xl overflow-hidden', size === 'sm' ? 'h-18' : 'h-[88px]', !inBox && 'hover:bg-surface-container-hovered transition-all', linkClassName), href: disableJumpToChat ? '' : `${showChat ? buttonUrl : clickUrl}`, children: [_jsx(Avatar, { size: size === 'sm' ? 'xl' : '4xl', src: item?.logoUrl, alt: "avatar" }), _jsx("div", { className: cn('w-[calc(100%-84px)] flex-1 flex flex-col justify-center items-start ml-3 text-sm', size === 'sm' ? 'h-[46px]' : 'h-[84px]'), children: _jsxs("div", { className: cn('w-full', showChat || item?.showVoice ? 'flex justify-center items-center' : ''), children: [_jsxs("div", { className: cn('h-full flex-1 flex flex-col  text-sm space-y-0.5', !item?.showVoice ? 'md:justify-between items-start' : 'min-w-0'), children: [_jsx(Text, { size: "lg", weight: "medium", color: inBox ? 'static' : 'default', lineClamp: 1, children: item?.title }), showTags ? (_jsx("div", { className: "flex space-x-2", children: (item?.tags || [])?.length > 0 ? (_jsx(Tags, { tagList: item?.tags, showCount: 4 })) : (_jsx("div", { className: "h-[22px]" })) })) : (_jsx(Text, { size: "sm", weight: "regular", color: inBox ? 'static' : 'subtler', lineClamp: size === 'sm' ? 1 : 2, className: "max-w-full break-words", style: {
                                                wordBreak: 'break-word'
                                            }, dangerous: true, children: item?.description || t('bot.no_desc') })), item.authorName && item.authorNameTag && (_jsxs(Description, { size: "lg", weight: "medium", lineClamp: 1, className: cn('text-brand max-w-full break-words hover:underline'), style: {
                                                wordBreak: 'break-word'
                                            }, onClick: e => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                if (isMobile) {
                                                    const userUrl = `${window.location.origin}/explore/profile/${encodeURIComponent(`${item.authorName}`)}/${encodeURIComponent(`${item.authorNameTag}`)}`;
                                                    router.push(userUrl);
                                                }
                                                else {
                                                    typeof setShowUserDetail === 'function' &&
                                                        setShowUserDetail({
                                                            name: encodeURIComponent(`${item.authorName}`),
                                                            nameTag: encodeURIComponent(`${item.authorNameTag}`)
                                                        });
                                                }
                                            }, children: ["@", item.authorName] }))] }), showChat && item?.buttonTitle && item?.buttonUrl && (_jsx(Button, { variant: "static", size: "sm", children: item?.buttonTitle })), item?.showVoice && (_jsx("div", { className: "flex-shrink-0 ml-2", children: _jsx(TryTTSBtn, { widgetId: item.id }) }))] }) })] }), isLine && (_jsx("div", { className: cn('pl-4', size === 'sm' ? 'ml-12' : 'ml-[72px]'), children: _jsx("hr", { className: cn('w-full border-t-0 border-b border-default mt-2', dividerClassName) }) }))] }, `normal-item-${item?.id}`));
}
export default NormalCard;
