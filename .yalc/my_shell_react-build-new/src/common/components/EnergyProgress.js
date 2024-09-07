"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const common_helper_1 = require("../../common/utils/common-helper.js");
const tooltip_1 = require("./ui/tooltip.js");
function EnergyProgress(props) {
    const { energy, dailyEnergy, className, hoverText } = props;
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: className, children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute left-[-20px] justify-center items-center w-6 h-6 border border-solid border-[#F3D42D] dark:border-[#A48F07] bg-white dark:bg-[#24210B] rounded-[6px] z-10", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: (0, common_helper_1.getAssetsUrlV2)('image/bot/tag/20231214/1719340128612116720.png'), alt: "energy", width: 22, height: 22 }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: hoverText ??
                    commonT('energy_tip', {
                        limit: dailyEnergy,
                        unit: Math.floor(dailyEnergy / 24)
                    }), side: "bottom", align: "end", sideOffset: 16, alignOffset: -16, showArrow: false, children: (0, jsx_runtime_1.jsx)(react_1.Progress, { value: energy, min: 0, max: dailyEnergy, bg: "#FDF5CA", sx: { '& > div:first-of-type': { bg: resolvedTheme === 'dark' ? '#A48F07' : '#F3D42D' } }, height: "20px", className: "rounded-[6px] rounded-l-none border border-solid border-[#F3D42D] dark:border-[#A48F07] bg-[#FDF5CA] dark:bg-[#454127] flex justify-start items-center", width: `${(0, common_helper_1.clamp)(75 + (Math.max(dailyEnergy, energy).toString().length - 3) * 12, 60, 220)}px`, children: (0, jsx_runtime_1.jsx)(react_1.ProgressLabel, { w: "80%", className: "text-surface-lemon-bold font-medium ml-[2px]", fontSize: "12px", children: `${energy}/${dailyEnergy}` }) }) })] }));
}
exports.default = EnergyProgress;
