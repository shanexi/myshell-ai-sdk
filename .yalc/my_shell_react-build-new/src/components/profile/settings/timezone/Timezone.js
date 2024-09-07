"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Timezone;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const select_1 = require("../../../../common/components/ui/select.js");
const useUserSettings_1 = __importDefault(require("../../../../common/hooks/useUserSettings.js"));
const store_1 = require("../../../../services/store/index.js");
const options_1 = __importDefault(require("./options.js"));
function Timezone() {
    const timezoneLocale = (0, next_intl_1.useTranslations)('timezone');
    const t = (0, next_intl_1.useTranslations)('profile');
    const timezoneValue = (0, store_1.useUserStore)(state => state.timezone);
    const { handleTimezoneChange } = (0, useUserSettings_1.default)();
    const onValueChange = (val) => {
        handleTimezoneChange(val);
    };
    return ((0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: onValueChange, value: timezoneValue, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-full md:w-[450px] h-11", children: (0, jsx_runtime_1.jsxs)("div", { className: "grow flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { children: t('timezone') }), (0, jsx_runtime_1.jsx)(select_1.SelectValue, {})] }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: options_1.default?.map(timezone => ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: timezone.value, children: timezoneLocale(timezone.label, {
                        utcoffset: timezone.utcOffset
                    }) }, timezone.value))) })] }));
}
