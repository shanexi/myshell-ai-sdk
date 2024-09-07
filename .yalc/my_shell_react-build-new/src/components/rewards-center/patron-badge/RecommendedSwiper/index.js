"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RecommendedSwiper;
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronLeftIcon"));
const QuestionMarkCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/QuestionMarkCircleIcon"));
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/solid/ChevronRightIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const modules_1 = require("swiper/modules");
const react_2 = require("swiper/react");
const agentPump_1 = require("../../../../apis/agentPump.js");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const SwiperSkeleton_1 = __importDefault(require("../../../../components/skeleton/rewards-center/partron-badge/SwiperSkeleton.js"));
const utils_1 = require("../../../../lib/utils.js");
const RecommendedCard_1 = __importDefault(require("./RecommendedCard.js"));
require("swiper/css");
require("swiper/css/autoplay");
require("swiper/css/navigation");
function RecommendedSwiper(props) {
    const { onCardClick } = props;
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const swiperRef = (0, react_1.useRef)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [records, setRecords] = (0, react_1.useState)([]);
    const initData = async () => {
        try {
            setLoading(true);
            const response = await (0, agentPump_1.getRecommended)();
            if (response.success) {
                const curves = response?.data?.curves;
                const newRecords = curves?.map(curve => {
                    return {
                        avatar: curve.botSummary?.logoUrl,
                        tickerName: curve.symbol,
                        botName: curve.botSummary?.name,
                        holders: curve.holdersCount,
                        price: curve.price,
                        botId: curve.botSummary.id,
                        symbol: curve.symbol,
                        curveTag: curve.curveTags?.[0]?.label || '',
                        onClick: onCardClick
                    };
                });
                setRecords(newRecords);
            }
            else {
            }
        }
        catch (error) {
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        initData();
    }, []);
    return loading ? ((0, jsx_runtime_1.jsx)(SwiperSkeleton_1.default, { isMobile: isMobile })) : (records.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex flex-col gap-3 py-2 md:pt-6 md:pb-3'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1 items-center mx-4 md:mx-6", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h3", children: t('recommended') }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('recommended_tip'), align: isMobile ? 'end' : 'center', children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-4 h-4 text-subtlest" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-[120px] rounded-md ml-4 relative", children: [(0, jsx_runtime_1.jsx)(react_2.Swiper, { slidesPerView: "auto", spaceBetween: 30, autoplay: true, loop: true, onBeforeInit: swiper => {
                            swiperRef.current = swiper;
                        }, breakpoints: {
                            0: {
                                slidesPerView: 1.014,
                                spaceBetween: 20,
                                slidesPerGroup: 1
                            },
                            785: {
                                slidesPerView: 1,
                                slidesPerGroup: 1,
                                spaceBetween: 20
                            },
                            1000: {
                                slidesPerView: 2,
                                slidesPerGroup: 1,
                                spaceBetween: 20
                            },
                            1376: {
                                slidesPerView: 3,
                                slidesPerGroup: 1,
                                spaceBetween: 20
                            },
                            1856: {
                                slidesPerView: 4,
                                slidesPerGroup: 1,
                                spaceBetween: 20
                            }
                        }, modules: [modules_1.Autoplay, modules_1.Navigation], className: "recommendedSwiper", children: records.map((item, index) => ((0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { children: (0, jsx_runtime_1.jsx)(RecommendedCard_1.default, { ...item }) }, index))) }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('hidden md:flex w-9 h-9 rounded-full bg-surface-search-field border border-default items-center justify-center absolute left-0 top-[50%] translate-y-[-50%] z-10'), children: (0, jsx_runtime_1.jsx)("button", { onClick: () => swiperRef.current?.slidePrev(), children: (0, jsx_runtime_1.jsx)(ChevronLeftIcon_1.default, { className: "2-5.5 h-5.5 text-icon" }) }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('hidden md:flex w-9 h-9 rounded-full bg-surface-search-field border border-default items-center justify-center absolute right-0 top-[50%] translate-y-[-50%] translate-x-[-50%] z-10'), children: (0, jsx_runtime_1.jsx)("button", { onClick: () => swiperRef.current?.slideNext(), children: (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { className: "2-5.5 h-5.5 text-icon" }) }) })] })] })));
}
