"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const button_1 = require("../../../../../common/components/ui/button.js");
const useCopyClipboard_1 = __importDefault(require("../../../../../common/hooks/useCopyClipboard.js"));
function CopyBtn({ code }) {
    const t = (0, next_intl_1.useTranslations)('common');
    const { onCopy } = (0, useCopyClipboard_1.default)(JSON.stringify(code ?? ''));
    const onClick = (e) => {
        e.preventDefault();
        onCopy();
    };
    return ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "md", disabled: !code, onClick: onClick, children: t('copy') }));
}
exports.default = (0, react_1.memo)(CopyBtn);
