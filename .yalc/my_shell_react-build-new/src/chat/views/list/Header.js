"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const EnergyProgress_1 = __importDefault(require("../../../common/components/EnergyProgress.js"));
const typography_1 = require("../../../common/components/ui/typography.js");
const store_1 = require("../../../services/store/index.js");
function Header() {
    const token = (0, store_1.useUserStore)(state => state.token);
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const dailyEnergy = (0, store_1.useUserStore)(state => state.dailyEnergy);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center pt-5 md:pt-6 pb-3 w-full", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "md", className: "flex-1 flex items-center text-default", children: chatLocale('chat') }), !!token && !!dailyEnergy && ((0, jsx_runtime_1.jsx)(EnergyProgress_1.default, { dailyEnergy: dailyEnergy, energy: energy, className: "flex relative items-center" }))] }));
}
