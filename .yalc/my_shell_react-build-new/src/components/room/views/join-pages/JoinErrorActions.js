"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JoinErrorActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const button_1 = require("../../../../common/components/ui/button.js");
const link_1 = __importDefault(require("../../../../common/components/ui/link.js"));
const runtime_config_1 = require("../../../../common/utils/runtime-config.js");
function JoinErrorActions() {
    const roomT = (0, next_intl_1.useTranslations)('chat.room');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: `/chat/${runtime_config_1.TRANSLATOR_BOT_ID}`, children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "brand", size: "lg", className: "w-full", children: roomT('create_your_own_room') }) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/explore", className: "text-brand", children: roomT('go_to_explore') })] }));
}
