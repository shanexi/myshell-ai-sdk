"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const not_found_jpg_1 = __importDefault(require("./assets/images/not_found.jpg"));
const not_found_dark_png_1 = __importDefault(require("./assets/images/not_found_dark.png"));
const next_intl_1 = require("next-intl");
const usePathLocale_1 = require("../../../../../common/hooks/usePathLocale.js");
const next_themes_1 = require("next-themes");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const image_1 = require("../../../../../common/components/ui/image.js");
const link_1 = __importDefault(require("../../../../../common/components/ui/link.js"));
const NotFound = () => {
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const t = (0, next_intl_1.useTranslations)('reward_center');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-[378px] flex flex-col justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", children: [(0, jsx_runtime_1.jsx)(image_1.Image, { alt: "no rewards", src: isDark ? not_found_dark_png_1.default.src : not_found_jpg_1.default.src, width: 200, height: 192 }), (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", className: "mt-3", children: t('my_rewards_content.nothing_found') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtle", className: "mt-1.5 text-center", children: t('my_rewards_content.no_reward') }), (0, jsx_runtime_1.jsx)(link_1.default, { href: `${isMobile ? '/m' : ''}/rewards-center/earn`, children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "mt-6", children: t('my_rewards_content.go_earn_shell_ponits') }) })] }));
};
exports.NotFound = NotFound;
