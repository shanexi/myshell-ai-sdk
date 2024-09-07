"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const isomorphic_dompurify_1 = require("isomorphic-dompurify");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const link_1 = __importDefault(require("./ui/link.js"));
function BotCommonItem(props) {
    const { item, isLine, showChat, isMobile, showAuthor, loading, singleList = false, chatType } = props;
    const t = (0, next_intl_1.useTranslations)();
    const [loadingId, setLoadingId] = (0, react_2.useState)('');
    let description = item.description?.replaceAll('\n', '</br>');
    description = (0, isomorphic_dompurify_1.sanitize)(description, {
        ADD_ATTR: ['target'],
        FORBID_TAGS: ['style', 'form', 'input', 'checkbox', 'svg'],
        FORBID_ATTR: ['action']
    });
    const { author } = item;
    let linkHref = '';
    const searchParams = new URLSearchParams(window.location.search);
    const from = `from=${searchParams.get('from') || 'article_content'}`;
    switch (chatType) {
        case 'WIDGET':
            linkHref = `/robot-workshop/widget/${item?.id}${from ? `?${from}` : ''}`;
            break;
        default:
            linkHref = isMobile
                ? `/m/chat/${item?.id}${from ? `?${from}` : ''}`
                : `/chat/${item?.id}${from ? `?${from}` : ''}`;
            break;
    }
    return ((0, jsx_runtime_1.jsxs)("li", { className: (0, clsx_1.default)('bot-common-item w-full cursor-pointer rounded-[12px] overflow-hidden'), children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: linkHref, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('h-fit flex flex-row justify-start items-center hover:bg-surface-pressed transition-all p-2 pl-0 md:pl-2 rounded-[12px] overflow-hidden', { 'w-full': !singleList, 'ml-2': isMobile }), children: [isMobile ? ((0, jsx_runtime_1.jsx)("img", { className: (0, clsx_1.default)('object-cover self-start rounded-2xl aspect-square bg-[#eee] dark:bg-[#414345]', isMobile ? 'w-[72px]' : 'w-[64px]'), src: item?.logoUrl ? item?.logoUrl : 'https://image.myshell.ai/image/bot/logo/20240106/default.png', alt: "avatar" })) : ((0, jsx_runtime_1.jsx)("img", { className: (0, clsx_1.default)('object-cover self-start rounded-2xl aspect-square bg-[#eee] dark:bg-[#414345]', isMobile ? 'w-[72px]' : 'w-[64px]'), src: item?.logoUrl ? item?.logoUrl : 'https://image.myshell.ai/image/bot/logo/20240106/default.png', alt: "avatar" })), (0, jsx_runtime_1.jsx)("div", { className: "w-[calc(100%-64px)] h-full flex-1 flex flex-col justify-between items-start ml-3 text-sm", children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full', isMobile || showChat ? 'flex justify-center items-center' : ''), children: [(0, jsx_runtime_1.jsxs)("div", { className: "h-full flex-1 flex flex-col md:justify-between items-start text-sm space-y-1 mr-2", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('line-clamp-1 text-[14px] font-medium text-on-surface'), children: item.name }), (0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('pr-2 md:pr-0 md:max-w-full break-words text-secondary text-[12px]', showAuthor ? 'line-clamp-1 max-h-[20px]' : 'line-clamp-2 max-h-[40px]'), style: {
                                                    wordBreak: 'break-word'
                                                }, dangerouslySetInnerHTML: {
                                                    __html: !loading ? description || t('bot.no_desc') : ''
                                                } }), showAuthor && !loading && author?.name && author?.nameTag && ((0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('w-full text-[secondary] line-clamp-1 text-[12px] space-x-1 flex'), onClick: e => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    props.setShowUserDetail &&
                                                        props.setShowUserDetail({
                                                            name: encodeURIComponent(author?.name),
                                                            nameTag: encodeURIComponent(author?.nameTag)
                                                        });
                                                }, children: (0, jsx_runtime_1.jsxs)("span", { className: "line-clamp-1 text-primary hover:underline", children: ["@", author?.name] }) }))] }), (isMobile || showChat) && !loading && ((0, jsx_runtime_1.jsx)(react_1.Button, { className: "flex-shrink-0 py-1 px-3 text-primary bg-surface dark:bg-transparent text-sm leading-[20px] rounded-[24px] min-w-[58px] h-[28px] border-[1px] border-default font-semibold", isLoading: loadingId === item?.id, _hover: {
                                            background: 'bg-surface'
                                        }, _disabled: {
                                            opacity: 0.9,
                                            background: 'bg-surface'
                                        }, shadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.05)", children: item?.name ? t('chat.chat') : '' }))] }) })] }) }), isLine && ((0, jsx_runtime_1.jsx)("div", { className: "ml-[72px] md:ml-[68px] pl-4", children: (0, jsx_runtime_1.jsx)("hr", { className: "w-full border-t-0 border-b border-default mt-2" }) }))] }, `bot-common-item-li-${item?.id}`));
}
exports.default = BotCommonItem;
