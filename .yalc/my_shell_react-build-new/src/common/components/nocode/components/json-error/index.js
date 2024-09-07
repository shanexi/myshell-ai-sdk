"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonError = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const state_provider_1 = require("../state-provider/index.js");
const JsonError = () => {
    const i18n = (0, next_intl_1.useTranslations)('nocode');
    const state = (0, state_provider_1.useStateContext)();
    const setJsonMode = (0, state_provider_1.useStore)(state, state => state.setJsonMode);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-surface-default p-6 flex flex-col items-center justify-center", children: [(0, jsx_runtime_1.jsx)("div", { children: i18n('automata.json_mode_error') }), (0, jsx_runtime_1.jsxs)("div", { children: [i18n('automata.json_mode_error_suffix'), ' ', (0, jsx_runtime_1.jsx)("span", { onClick: () => setJsonMode(true), className: "text-primary cursor-pointer", children: i18n('automata.json_mode') })] })] }));
};
exports.JsonError = JsonError;
