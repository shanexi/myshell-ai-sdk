"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const isomorphic_dompurify_1 = require("isomorphic-dompurify");
const useRoute_1 = require("../../common/hooks/useRoute.js");
const Image_1 = __importDefault(require("./Image.js"));
function FeaturedItem(props) {
    const { item, loading, onJumpClick } = props;
    const { detail } = item;
    const { openUrl } = (0, useRoute_1.useRoute)();
    let description = detail?.description?.replaceAll('\n', '</br>');
    description = (0, isomorphic_dompurify_1.sanitize)(description, {
        ADD_ATTR: ['target'],
        FORBID_TAGS: ['style', 'form', 'input', 'checkbox', 'svg'],
        FORBID_ATTR: ['action']
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex justify-end flex-col bg-surface rounded-[24px] aspect-[346/334] relative', loading ? 'animate-pulse bg-surface rounded-[4px]' : ''), onClick: () => {
            if (onJumpClick) {
                onJumpClick(`${item?.baseSubCard?.clickJumpUrl}`);
            }
            else {
                openUrl(item?.baseSubCard?.clickJumpUrl);
            }
        }, children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-full h-full flex justify-end flex-col rounded-[24px] aspect-[334] bg-cover bg-no-repeat overflow-hidden ease-in-out duration-300 hover:scale-105", style: {
                    ...(item?.backgroundImageUrl && { backgroundImage: `url('${item.backgroundImageUrl}')` })
                } }), (0, jsx_runtime_1.jsxs)("div", { className: "p-4 relative z-[2]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, clsx_1.default)('text-white text-base leading-[1.3] uppercase font-semibold line-clamp-1 opacity-80', props.loading ? 'animate-pulse rounded-[4px] bg-[#F6F6F7] dark:bg-[#323339] h-[20px] w-[50%]' : ''), children: item?.title }), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('text-white text-xl leading-[110%] font-bold line-clamp-1 mt-[6px]', props.loading ? 'animate-pulse rounded-[4px] bg-[#F6F6F7] dark:bg-[#323339] h-[50px] w-[90%]' : ''), children: item?.subTitle }), (0, jsx_runtime_1.jsx)("hr", { className: "w-full border-t-0 border-b border-[#fff] my-4 opacity-30" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row justify-between items-center", children: [!loading ? ((0, jsx_runtime_1.jsx)(Image_1.default, { className: "self-start rounded-[10px] aspect-square !w-[48px] !bg-transparent", src: item?.bottomZone?.image || 'https://image.myshell.ai/image/bot/logo/20240106/default.png', placeholder: "https://image.myshell.ai/image/bot/logo/20240106/default.png", alt: "avatar" })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('self-start rounded-2xl aspect-square bg-[#F6F6F7] dark:bg-[#323339] w-[48px]') })), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col justify-center items-start ml-[10px] text-sm text-white w-[50%] overflow-hidden", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('line-clamp-1 text-[16px] font-semibold leading-[1.1]', props.loading ? 'animate-pulse rounded-[4px] bg-[#F6F6F7] dark:bg-[#323339] h-[20px] w-[40%]' : ''), children: item?.bottomZone?.title }), (0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('line-clamp-1 mt-1 text-[14px] leading-[1.2] w-full break-all opacity-80', props.loading ? 'animate-pulse rounded-[4px] bg-[#F6F6F7] dark:bg-[#323339] h-[20px] w-[90%]' : ''), children: item?.bottomZone?.subTitle })] }), item?.bottomZone?.button?.title && ((0, jsx_runtime_1.jsx)(react_1.Button, { className: "py-1 px-3 bg-[var(--surface-create-bg)] text-primary font-medium text-sm leading-[20px] rounded-full min-w-[58px] h-[28px]", _hover: {
                                    background: 'var(--surface-create-bg)'
                                }, _disabled: {
                                    opacity: 0.9,
                                    background: 'var(--surface-create-bg)'
                                }, onClick: e => {
                                    e.stopPropagation();
                                    openUrl(item?.bottomZone?.button?.jumpUrl);
                                }, children: item?.bottomZone?.button?.title }))] })] })] }));
}
exports.default = FeaturedItem;
