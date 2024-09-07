"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const select_1 = require("./ui/select.js");
function ThemeSelect() {
    const { theme, setTheme } = (0, next_themes_1.useTheme)();
    const t = (0, next_intl_1.useTranslations)('profile');
    const handleChange = async (mode) => {
        const finalTheme = mode;
        setTheme(finalTheme);
        document.cookie = `theme=${finalTheme}; path=/; max-age=31536000`;
    };
    const themeList = [
        {
            key: 'system',
            value: t('theme_system')
        },
        { key: 'light', value: t('theme_light') },
        {
            key: 'dark',
            value: t('theme_dark')
        }
    ];
    return ((0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: handleChange, value: theme, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-full md:w-[450px] h-11", children: (0, jsx_runtime_1.jsxs)("div", { className: "grow flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { children: t('theme_title') }), (0, jsx_runtime_1.jsx)(select_1.SelectValue, {})] }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: themeList.map(mode => {
                    return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: mode.key, children: mode.value }, mode.key));
                }) })] }));
}
exports.default = ThemeSelect;
