"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopInfo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const count_down_1 = __importDefault(require("../count-down/index.js"));
const season_switcher_1 = require("../season-switcher/index.js");
const useSeason_1 = __importDefault(require("../../../../hooks/rewards-center/useSeason.js"));
const next_intl_1 = require("next-intl");
const clsx_1 = __importDefault(require("clsx"));
const typography_1 = require("../../../../common/components/ui/typography.js");
const icon_1 = require("../../../../common/components/ui/icon.js");
const react_use_1 = require("react-use");
const next_themes_1 = require("next-themes");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const Skeleton_1 = require("./Skeleton.js");
const Star = (props) => ((0, jsx_runtime_1.jsx)("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", ...props, children: (0, jsx_runtime_1.jsx)("path", { d: "M8.20399 1.15117C8.47743 0.41223 9.52257 0.41223 9.796 1.15117L10.8257 3.93383C11.3812 5.43512 12.5649 6.61879 14.0662 7.17432L16.8488 8.20399C17.5878 8.47743 17.5878 9.52257 16.8488 9.796L14.0662 10.8257C12.5649 11.3812 11.3812 12.5649 10.8257 14.0662L9.796 16.8488C9.52257 17.5878 8.47743 17.5878 8.20399 16.8488L7.17432 14.0662C6.61879 12.5649 5.43512 11.3812 3.93383 10.8257L1.15117 9.796C0.41223 9.52257 0.41223 8.47743 1.15117 8.20399L3.93383 7.17432C5.43512 6.61879 6.61879 5.43512 7.17432 3.93383L8.20399 1.15117Z" }) }));
const TopInfo = () => {
    const { seasonName, isBate, seasonBanners, isInSilentPeriod, isInClaimablePeriod, isInSeasonPeriod, seasonEndDate, claimableEndDate, silentPeriodEndDate } = (0, useSeason_1.default)();
    const t = (0, next_intl_1.useTranslations)('reward_center');
    const isMobileDevice = (0, react_use_1.useMedia)('(max-width: 768px)');
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    return seasonName ? ((0, jsx_runtime_1.jsxs)("div", { className: "h-[320px] md:h-[292px] relative shrink-0 z-10 bg-surface-container-hovered", children: [seasonBanners && ((0, jsx_runtime_1.jsx)("img", { alt: "banner", className: "w-full h-full absolute top-0 left-0 object-cover", src: !(isMobile || isMobileDevice) ?
                    (!isDark ? seasonBanners[0] : seasonBanners[1]) :
                    (!isDark ? seasonBanners[2] : seasonBanners[3]) })), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-20 w-full h-full p-4 md:px-8 md:py-10 flex flex-col justify-end md:justify-between space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row", children: [(0, jsx_runtime_1.jsx)("h2", { className: (0, clsx_1.default)('grow-1 text-[36px] leading-[48px] md:text-[48px] md:leading-[56px] font-extrabold text-static line-clamp-1'), children: t(isBate ? 'season_beta' : 'season', {
                                            index: isBate ? seasonName.replace('S', '') : seasonName
                                        }) }), (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: Star, color: "static", size: "lg", className: "mr-1" }), (0, jsx_runtime_1.jsx)(season_switcher_1.SeasonSwitcher, {})] }), (0, jsx_runtime_1.jsx)("p", { className: "text-static w-fit text-base line-clamp-1 opacity-80", style: {
                                    textShadow: '0px 1px 2px rgba(0, 0, 0, 0.10)'
                                }, children: isBate ? t('earn_content.desc_beta') : t('earn_content.desc') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2", children: [(0, jsx_runtime_1.jsxs)(typography_1.Text, { color: "static", size: "sm", weight: "medium", className: "opacity-50", children: [isInSeasonPeriod ? t('earn_content.ends_in') : null, isInClaimablePeriod ? t('earn_content.reward_redemption_ends') : null, isInSilentPeriod ? t('earn_content.reward_redemption_in') : null] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(count_down_1.default, { target: isInSeasonPeriod ? seasonEndDate : (isInSilentPeriod ? silentPeriodEndDate :
                                        (isInClaimablePeriod ? claimableEndDate : null)) }) })] })] })] })) : (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, {});
};
exports.TopInfo = TopInfo;
