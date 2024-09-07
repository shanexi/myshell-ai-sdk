"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TTSFilters;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const GlobeAltIcon_1 = __importDefault(require("@heroicons/react/24/outline/GlobeAltIcon"));
const ChevronDownIcon_1 = __importDefault(require("@heroicons/react/24/solid/ChevronDownIcon"));
const next_intl_1 = require("next-intl");
const CheckOutline_1 = __importDefault(require("../../../../common/components/icons/workshop/tts/CheckOutline.js"));
const workshop_1 = require("../../../../services/store/workshop.js");
function TTSFilters({ queryingLangs, isGuide, selectedLang, setSelectedLang }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const commonT = (0, next_intl_1.useTranslations)('common');
    const languageList = (0, workshop_1.useWorkshopStore)(state => state.languageList);
    const botT = (0, next_intl_1.useTranslations)('bot');
    const selectedLangDisplayName = languageList.find(lang => `${lang.id}` === selectedLang)?.displayName || '';
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between px-3", children: (0, jsx_runtime_1.jsxs)(react_1.Menu, { offset: [-10, 10], children: [(0, jsx_runtime_1.jsx)(react_1.MenuButton, { h: "44px", p: "12px", display: "flex", as: react_1.Button, variant: "unstyled", border: "1px solid var(--border)", borderRadius: "12px", color: "var(--on-surface)", boxShadow: "0px 1px 0px 0px #0000000D", leftIcon: (0, jsx_runtime_1.jsx)(GlobeAltIcon_1.default, { className: "w-[20px] h-[20px] stroke-[--secondary]" }), rightIcon: (0, jsx_runtime_1.jsx)(ChevronDownIcon_1.default, { className: "w-[20px] h-[20px]" }), isDisabled: queryingLangs || isGuide, isLoading: queryingLangs, className: "min-w-[155px] filter-menu-button", children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: selectedLangDisplayName || t('tts_copy.all.language') }) }), (0, jsx_runtime_1.jsxs)(react_1.MenuList, { p: "8px", gap: "3px", borderRadius: "12px", borderColor: "var(--border)", minW: "155px", className: "bg-surface space-y-1 mt-[-6px] ml-[10px]", children: [(0, jsx_runtime_1.jsx)(react_1.MenuItem, { h: "28px", p: "4px 8px", className: "bg-surface-default hover:bg-surface-container rounded-[8px]", onClick: () => setSelectedLang('-1'), children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { justifyContent: "space-between", w: "full", alignItems: "center", children: [commonT('all'), ' ', selectedLang === '-1' ? (0, jsx_runtime_1.jsx)(CheckOutline_1.default, { color: "var(--primary)", fontSize: "20px" }) : null] }) }), languageList.map(lang => ((0, jsx_runtime_1.jsx)(react_1.MenuItem, { h: "28px", p: "4px 8px", className: "bg-surface-default hover:bg-surface-container rounded-[8px]", onClick: () => {
                                if (!isGuide) {
                                    setSelectedLang(`${lang.id}`);
                                }
                            }, children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { justifyContent: "space-between", w: "full", alignItems: "center", children: [lang.displayName, selectedLang === `${lang.id}` ? (0, jsx_runtime_1.jsx)(CheckOutline_1.default, { color: "var(--primary)", fontSize: "20px" }) : null] }) }, lang.id)))] })] }) }));
}
