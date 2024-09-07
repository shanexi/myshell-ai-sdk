"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const select_1 = require("../../../common/components/ui/select.js");
const user_1 = require("../../../common/constants/enums/user.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const useUserSettings_1 = __importDefault(require("../../../common/hooks/useUserSettings.js"));
const identityService_1 = require("../../../common/services/identityService.js");
const language_1 = require("../../../common/utils/language.js");
const useSeason_1 = __importDefault(require("../../../hooks/rewards-center/useSeason.js"));
function LanguageSwitch({ clearListParam }) {
    const { handleUpdateLanguage, currentLanguage } = (0, useUserSettings_1.default)();
    const router = (0, navigation_1.useRouter)();
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const { querySeasons } = (0, useSeason_1.default)();
    const handleLanguage = async (value) => {
        identityService_1.identityService.setLanguage(value);
        (0, language_1.setLocaleCookie)(value);
        try {
            await handleUpdateLanguage(value);
            querySeasons();
            clearListParam?.();
            router.refresh();
        }
        catch (error) { }
    };
    return ((0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: handleLanguage, value: currentLanguage, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-full md:w-[450px] h-11", children: (0, jsx_runtime_1.jsxs)("div", { className: "grow flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { children: commonT('language') }), (0, jsx_runtime_1.jsx)(select_1.SelectValue, {})] }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: user_1.ALL_LANG_KEYS.map(langkey => {
                    return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: langkey, children: (0, jsx_runtime_1.jsx)("div", { className: "w-full flex items-center justify-between", children: user_1.ALL_LANG_OPTIONS[langkey] }) }, langkey));
                }) })] }));
}
exports.default = LanguageSwitch;
