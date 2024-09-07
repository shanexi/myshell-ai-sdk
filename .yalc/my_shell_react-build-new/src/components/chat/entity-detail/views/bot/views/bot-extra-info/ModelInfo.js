"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ModelInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const tooltip_1 = require("../../../../../../../common/components/ui/tooltip.js");
function ModelInfo({ model }) {
    const botLocale = (0, next_intl_1.useTranslations)('bot');
    if (!(model && model.iconUrl))
        return null;
    return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { showArrow: false, description: botLocale('powered_by', {
            modelName: model.modelName
        }), children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "llm model icon", src: model.iconUrl, width: 20, height: 20, className: "rounded-md shrink-0 overflow-hidden" }) }));
}
