"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const isomorphic_dompurify_1 = require("isomorphic-dompurify");
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const useRoute_1 = require("../../common/hooks/useRoute.js");
const NormalPopDetail_1 = __importDefault(require("./NormalPopDetail.js"));
function NormalItem(props) {
    const { item, isLine, showChat, loading, setShowUserDetail, showAuthor } = props;
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const detail = item.detail || item;
    const { openUrl } = (0, useRoute_1.useRoute)();
    const t = (0, next_intl_1.useTranslations)();
    const [loadingId, setLoadingId] = (0, react_2.useState)('');
    const router = (0, navigation_1.useRouter)();
    let description = (item?.subTitle || detail?.description)?.replaceAll('\n', '</br>');
    description = (0, isomorphic_dompurify_1.sanitize)(description, {
        ADD_ATTR: ['target'],
        FORBID_TAGS: ['style', 'form', 'input', 'checkbox', 'svg'],
        FORBID_ATTR: ['action']
    });
    const author = item.author || detail.author;
    return ((0, jsx_runtime_1.jsxs)("li", { className: (0, clsx_1.default)('normal-item w-full cursor-pointer rounded-[12px] overflow-hidden'), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('md:w-full h-fit flex flex-row justify-start items-center hover:bg-surface-container-hovered transition-all p-2 pl-0 md:pl-2 rounded-[12px] overflow-hidden', isMobile ? 'ml-2' : ''), onClick: () => {
                    if (item?.baseSubCard?.clickJumpUrl) {
                        openUrl(item?.baseSubCard?.clickJumpUrl);
                    }
                    else {
                        props.setShowDetail(detail);
                    }
                }, children: [isMobile ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !loading ? ((0, jsx_runtime_1.jsx)("img", { className: (0, clsx_1.default)('object-cover self-start rounded-2xl aspect-square bg-[#eee] dark:bg-[#414345]', isMobile ? 'w-[72px]' : 'w-[64px]'), src: detail?.logoUrl || 'https://image.myshell.ai/image/bot/logo/20240106/default.png', alt: "avatar" })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('self-start rounded-2xl aspect-square bg-[#eee] dark:bg-[#414345]', isMobile ? 'w-[72px]' : 'w-[64px]') })) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading ? ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('rounded-[16px] aspect-square bg-[#eee] dark:bg-[#414345]', isMobile ? 'w-[72px]' : 'w-[64px]') })) : ((0, jsx_runtime_1.jsxs)(react_1.Popover, { trigger: "hover", children: [(0, jsx_runtime_1.jsx)(react_1.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)("img", { className: (0, clsx_1.default)('object-cover self-start rounded-2xl aspect-square bg-[#eee] dark:bg-[#414345]', isMobile ? 'w-[72px]' : 'w-[64px]'), src: detail?.logoUrl || 'https://image.myshell.ai/image/bot/logo/20240106/default.png', alt: "avatar" }) }), (0, jsx_runtime_1.jsxs)(react_1.PopoverContent, { className: "bg-transparent border-0", children: [(0, jsx_runtime_1.jsx)(react_1.PopoverArrow, {}), (0, jsx_runtime_1.jsx)(react_1.PopoverBody, { className: "p-0", children: (0, jsx_runtime_1.jsx)(NormalPopDetail_1.default, { isMobile: isMobile, item: item }) })] })] })) })), (0, jsx_runtime_1.jsx)("div", { className: "w-[calc(100%-64px)] h-full flex-1 flex flex-col justify-between items-start ml-3 text-sm", children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full', isMobile || showChat ? 'flex justify-center items-center' : ''), children: [(0, jsx_runtime_1.jsxs)("div", { className: "h-full flex-1 flex flex-col md:justify-between items-start text-sm space-y-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('text-on-surface line-clamp-1 text-[14px] font-medium', loading ? 'animate-pulse bg-[#eee] dark:bg-[#414345] rounded-[4px] w-[40%] h-[16px]' : ''), children: item?.title || detail?.name }), (0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('text-secondary text-[12px] pr-2 md:pr-0 md:max-w-full break-words', loading ? 'animate-pulse bg-[#eee] dark:bg-[#414345] rounded-[4px] w-full h-[40px]' : '', showAuthor ? 'line-clamp-1 max-h-[20px]' : 'line-clamp-2 max-h-[40px]'), style: {
                                                wordBreak: 'break-word'
                                            }, dangerouslySetInnerHTML: {
                                                __html: description || (!loading ? t('bot.no_desc') : '')
                                            } }), showAuthor && !loading && author?.name && author?.nameTag && ((0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('w-full pr-3 text-secondary line-clamp-1 text-[12px] space-x-1 flex'), onClick: e => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                if (isMobile) {
                                                    const userUrl = `${window.location.origin}/explore/profile/${encodeURIComponent(`${author?.name}`)}/${encodeURIComponent(`${author?.nameTag}`)}`;
                                                    router.push(userUrl);
                                                }
                                                else {
                                                    setShowUserDetail &&
                                                        setShowUserDetail({
                                                            name: encodeURIComponent(author?.name),
                                                            nameTag: encodeURIComponent(author?.nameTag)
                                                        });
                                                }
                                            }, children: (0, jsx_runtime_1.jsxs)("span", { className: "line-clamp-1 text-primary hover:underline", children: ["@", author?.name] }) }))] }), (isMobile || showChat) && !loading && item?.button?.title && ((0, jsx_runtime_1.jsx)(react_1.Button, { className: "flex-shrink-0 py-1 px-3 text-primary bg-surface dark:bg-transparent text-sm leading-[20px] rounded-[24px] min-w-[58px] h-[28px] border-[1px] border-default font-semibold", isLoading: loadingId === item?.id, _hover: {
                                        background: 'bg-surface'
                                    }, _disabled: {
                                        opacity: 0.9,
                                        background: 'bg-surface'
                                    }, onClick: e => {
                                        e.stopPropagation();
                                        openUrl(item?.button?.jumpUrl);
                                    }, shadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.05)", children: item?.button?.title }))] }) })] }), isLine && ((0, jsx_runtime_1.jsx)("div", { className: "ml-[72px] md:ml-[68px] pl-4", children: (0, jsx_runtime_1.jsx)("hr", { className: "w-full border-t-0 border-b border-default mt-2" }) }))] }, `normal-item-li-${item?.id}`));
}
exports.default = NormalItem;
