"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FeaturedInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowSmallLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowSmallLeftIcon"));
const CheckBadgeIcon_1 = __importDefault(require("@heroicons/react/24/solid/CheckBadgeIcon"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const workshop_1 = require("../../apis/workshop.js");
const useRoute_1 = require("../../common/hooks/useRoute.js");
const NormalItem_1 = __importDefault(require("./NormalItem.js"));
const tooltip_1 = require("./ui/tooltip.js");
const Image_1 = __importDefault(require("../../components/explore/Image.js"));
const skeleton_1 = require("../../components/skeleton/index.js");
function FeaturedInfo(pros) {
    const { pageId, isMobile } = pros;
    const t = (0, next_intl_1.useTranslations)();
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const [chatLoading, setChatLoading] = (0, react_2.useState)(false);
    const [loading, setLoading] = (0, react_2.useState)(true);
    const { openUrl } = (0, useRoute_1.useRoute)();
    const [featuredData, setFeaturedData] = (0, react_2.useState)();
    const isMultilItem = featuredData?.items?.length > 1;
    const detail = featuredData?.items?.[0]?.detail;
    const router = (0, navigation_1.useRouter)();
    (0, react_2.useEffect)(() => {
        const getFeatureData = async () => {
            try {
                const res = await (0, workshop_1.getFeaturePageDetailInfo)({ pageId });
                setLoading(false);
                if (res.success) {
                    setFeaturedData(res.data);
                }
            }
            catch {
                setLoading(false);
            }
        };
        getFeatureData();
    }, [pageId]);
    return ((0, jsx_runtime_1.jsx)("section", { className: "fixed top-0 left-0 bg-surface z-[10] w-full h-full flex-1 flex flex-col p-0 md:p-2 overflow-hidden", children: loading ? ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full justify-center items-center", children: (0, jsx_runtime_1.jsx)(skeleton_1.Loading, {}) })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center w-full h-[56px] md:h-[72px] px-4 py-2.5 md:px-5 md:py-[18px] border-b border-default bg-surface md:rounded-t-[24px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mr-5 flex items-center text-[16px] font-semibold text-on-surface cursor-pointer", onClick: () => {
                                router.back();
                            }, children: [(0, jsx_runtime_1.jsx)("div", { className: "float-right", children: (0, jsx_runtime_1.jsx)(ArrowSmallLeftIcon_1.default, { className: "stroke-primary md:stroke-secondary m-[6px] w-8 h-8 md:w-6 md:h-6" }) }), !isMobile && t('workshop.back')] }), !isMobile && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center text-[20px] leading-[1.3] text-on-surface", children: [(0, jsx_runtime_1.jsx)("p", { children: featuredData?.topTitle }), detail?.isOfficial && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: chatT('official_bot'), children: (0, jsx_runtime_1.jsx)(CheckBadgeIcon_1.default, { className: "w-[24px] h-[24px] leading-[1.3] fill-primary cursor-pointer" }) }))] }))] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex-col md:flex-row flex bg-surface overflow-y-auto md:overflow-hidden rounded-b-[24px]", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col md:flex-row", children: [isMobile ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-end flex-col aspect-[345/300] relative bg-cover bg-no-repeat overflow-hidden", style: {
                                    ...(featuredData?.backgroundImageUrl && {
                                        backgroundImage: `url('${featuredData?.backgroundImageUrl}')`
                                    })
                                }, children: (0, jsx_runtime_1.jsx)("div", { className: "min-h-[288px]", children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: "mt-[40vw]", children: [(0, jsx_runtime_1.jsx)("p", { className: "mx-[16px] text-white text-[16px] leading-[20px] uppercase font-medium", children: featuredData?.title }), (0, jsx_runtime_1.jsx)("div", { className: "mx-[16px] h-[22px] text-white text-xl leading-[1.1] mt-[6px] font-bold line-clamp-1", children: featuredData?.titleDescription }), !isMultilItem && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("hr", { className: "w-full border-0 mt-4" }), (0, jsx_runtime_1.jsxs)("div", { className: "p-4 flex flex-row justify-between items-center bg-[#00000033] rounded-b-[24px] overflow-hidden", style: { backdropFilter: 'blur(56px)' }, children: [(0, jsx_runtime_1.jsx)(Image_1.default, { className: "self-start rounded-[10px] aspect-square !w-[48px]", src: featuredData?.logoUrl ||
                                                                        'https://image.myshell.ai/image/bot/logo/20240106/default.png', placeholder: "https://image.myshell.ai/image/bot/logo/20240106/default.png", alt: "avatar" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col justify-between items-start ml-[10px] text-sm text-white", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[16px] leading-[20px] font-medium line-clamp-1", children: detail?.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-[14px] w-[180px] font-medium leading-[20px] text-ellipsis line-clamp-1 mt-1", children: detail?.description })] }), (0, jsx_runtime_1.jsx)("button", { className: "min-w-[58px] h-[28px] py-1 px-3 bg-[var(--surface-create-bg)] text-primary font-medium text-sm leading-[20px] rounded-full", onClick: e => {
                                                                        e.stopPropagation();
                                                                        setChatLoading(true);
                                                                        openUrl(featuredData?.items[0]?.button?.jumpUrl);
                                                                    }, children: featuredData?.items[0]?.button?.title })] })] }))] }) }) }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "bg-surface w-full flex justify-center items-center md:w-[50%] bg-[#F6F6F7] dark:bg-[#323339 !bg-cover", style: {
                                    background: `url(${featuredData?.leftMedias?.[0]?.image?.url})`
                                } })), (0, jsx_runtime_1.jsxs)("div", { className: "bg-surface w-full md:w-[50%] px-4 py-4 md:px-8 md:py-10 space-y-4 md:space-y-6 text-[18px] text-[#1D192B] dark:text-[#fff] overflow-y-hidden md:overflow-y-auto", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[18px] md:text-[24px] font-semibold line-clamp-1", children: featuredData?.headline }), (0, jsx_runtime_1.jsxs)("p", { children: [featuredData?.headlineDescription, " "] }), isMobile ? ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-auto min-h-[300px]", children: featuredData?.mobileRightMedias?.[0]?.image?.url && ((0, jsx_runtime_1.jsx)(Image_1.default, { className: "w-full h-full", src: featuredData?.mobileRightMedias?.[0]?.image?.url, alt: "bot img" })) })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-auto min-h-[300px]", children: (0, jsx_runtime_1.jsx)(Image_1.default, { className: "w-full h-auto min-h-[300px] object-cover", src: featuredData?.rightMedias?.[0]?.image?.url, alt: "bot img" }) })), (0, jsx_runtime_1.jsx)("p", { className: "font-semibold hidden md:block", children: featuredData?.title }), (0, jsx_runtime_1.jsxs)("p", { children: [featuredData?.titleDescription, " "] }), (0, jsx_runtime_1.jsx)("div", { className: `flex flex-col justify-center items-center py-6 space-y-[10px] bg-surface-create-bg rounded-[12px] ${!isMobile ? (isMultilItem ? 'max-h-[306px] px-3 overflow-y-auto' : 'h-[204px]') : ''}`, children: isMultilItem ? ((0, jsx_runtime_1.jsx)("ul", { className: "w-full space-y-2.5", children: featuredData?.items.map((item, index) => {
                                                return ((0, jsx_runtime_1.jsx)(NormalItem_1.default, { setShowDetail: () => {
                                                        return false;
                                                    }, showChat: true, item: item, isLine: index < featuredData?.items?.length - 1, loading: false }, `normal-item-${item.id}`));
                                            }) })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center flex flex-col items-center justify-center", children: [(0, jsx_runtime_1.jsx)(Image_1.default, { className: "!w-[64px] !h-[64px] rounded-[16px]", src: detail?.logoUrl || 'https://image.myshell.ai/image/bot/logo/20240106/default.png', placeholder: "https://image.myshell.ai/image/bot/logo/20240106/default.png", alt: "bot img" }), (0, jsx_runtime_1.jsx)("p", { className: "text-on-surface text-[16px] font-semibold mt-2.5 leading-[1.3]", children: detail?.name }), (0, jsx_runtime_1.jsx)("p", { className: "max-w-[174px] line-clamp-1 text-secondary text-[14px]", children: detail?.description })] }), (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", className: "flex justify-center items-center rounded-full border-[1px] border-default dark:border-[#42434A] py-1 px-3 cursor-pointer bg-white dark:bg-[var(--surface-create-bg)] min-w-[58px] h-[28px] text-primary font-semibold text-[14px]", boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.05)", isLoading: chatLoading, _hover: {
                                                        background: 'bg-[var(--surface-create-bg)]'
                                                    }, _disabled: {
                                                        opacity: 0.3,
                                                        background: 'bg-[var(--surface-create-bg)]'
                                                    }, onClick: e => {
                                                        e.stopPropagation();
                                                        setChatLoading(true);
                                                        openUrl(featuredData?.items[0]?.button?.jumpUrl);
                                                    }, children: featuredData?.items[0]?.button?.title })] })) })] })] }) })] })) }));
}
