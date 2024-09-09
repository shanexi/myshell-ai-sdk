"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const usePathLocale_1 = require("../../common/hooks/usePathLocale");
const TryTTSBtn_1 = __importDefault(require("../../components/workshop/widget-detail/detail/TryTTSBtn"));
const utils_1 = require("../../lib/utils");
const Tags_1 = require("./Tags");
const avatar_1 = require("./ui/avatar");
const button_1 = require("./ui/button");
const link_1 = require("./ui/link");
const typography_1 = require("./ui/typography");
function NormalCard(props) {
    const { item, isLine, showChat, size = 'default', className, linkClassName, inBox, showTags, setShowUserDetail, from, disableJumpToChat, onClick, dividerClassName } = props;
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const t = (0, next_intl_1.useTranslations)();
    const router = (0, navigation_1.useRouter)();
    const [buttonUrl, clickUrl] = (0, react_1.useMemo)(() => {
        return [
            item?.buttonUrl
                ? `${item?.buttonUrl}${item?.buttonUrl?.includes('?') ? '&' : '?'}${from ? `from=${from}` : ''}`
                : item?.buttonUrl,
            item?.clickUrl
                ? `${item?.clickUrl}${item?.clickUrl.includes('?') ? '&' : '?'}${from ? `from=${from}` : ''}`
                : item?.clickUrl
        ];
    }, [item?.buttonUrl, item?.clickUrl, from]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('normal-item w-full cursor-pointer rounded-xl overflow-hidden', className), onClick: onClick ? () => onClick(item?.id) : undefined, children: [(0, jsx_runtime_1.jsxs)(link_1.Link, { className: (0, utils_1.cn)('w-full px-0 md:px-2.5 flex flex-row justify-start items-center rounded-xl overflow-hidden', size === 'sm' ? 'h-18' : 'h-[88px]', !inBox && 'hover:bg-surface-container-hovered transition-all', linkClassName), href: disableJumpToChat ? '' : `${showChat ? buttonUrl : clickUrl}`, children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: size === 'sm' ? 'xl' : '4xl', src: item?.logoUrl, alt: "avatar" }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('w-[calc(100%-84px)] flex-1 flex flex-col justify-center items-start ml-3 text-sm', size === 'sm' ? 'h-[46px]' : 'h-[84px]'), children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full', showChat || item?.showVoice ? 'flex justify-center items-center' : ''), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('h-full flex-1 flex flex-col  text-sm space-y-0.5', !item?.showVoice ? 'md:justify-between items-start' : 'min-w-0'), children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", color: inBox ? 'static' : 'default', lineClamp: 1, children: item?.title }), showTags ? ((0, jsx_runtime_1.jsx)("div", { className: "flex space-x-2", children: (item?.tags || [])?.length > 0 ? ((0, jsx_runtime_1.jsx)(Tags_1.Tags, { tagList: item?.tags, showCount: 4 })) : ((0, jsx_runtime_1.jsx)("div", { className: "h-[22px]" })) })) : ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: inBox ? 'static' : 'subtler', lineClamp: size === 'sm' ? 1 : 2, className: "max-w-full break-words", style: {
                                                wordBreak: 'break-word'
                                            }, dangerous: true, children: item?.description || t('bot.no_desc') })), item.authorName && item.authorNameTag && ((0, jsx_runtime_1.jsxs)(typography_1.Description, { size: "lg", weight: "medium", lineClamp: 1, className: (0, utils_1.cn)('text-brand max-w-full break-words hover:underline'), style: {
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
                                            }, children: ["@", item.authorName] }))] }), showChat && item?.buttonTitle && item?.buttonUrl && ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "static", size: "sm", children: item?.buttonTitle })), item?.showVoice && ((0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0 ml-2", children: (0, jsx_runtime_1.jsx)(TryTTSBtn_1.default, { widgetId: item.id }) }))] }) })] }), isLine && ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('pl-4', size === 'sm' ? 'ml-12' : 'ml-[72px]'), children: (0, jsx_runtime_1.jsx)("hr", { className: (0, utils_1.cn)('w-full border-t-0 border-b border-default mt-2', dividerClassName) }) }))] }, `normal-item-${item?.id}`));
}
exports.default = NormalCard;
