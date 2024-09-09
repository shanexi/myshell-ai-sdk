"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextDisplay;
const jsx_runtime_1 = require("react/jsx-runtime");
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const display_provider_1 = require("../../display-provider");
const translation_display_1 = __importDefault(require("./translation-display"));
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../../../common/components/MdViewer'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
function TextDisplay() {
    const { message, displayMode } = (0, display_provider_1.useDisplayContext)();
    const quotedReference = (0, react_1.useMemo)(() => {
        let result;
        if (message?.referenceText) {
            const referenceText = message.referenceText
                .split('\n')
                .map(line => `> ${line}`)
                .join('\n');
            result = `${referenceText}\n\n`;
        }
        return result;
    }, [message?.referenceText]);
    if (displayMode === 'TRANSLATION') {
        return (0, jsx_runtime_1.jsx)(translation_display_1.default, {});
    }
    return (message?.text && ((0, jsx_runtime_1.jsx)(MdViewer, { content: `${quotedReference ?? ''}${message?.text ?? ''}`, status: message.status })));
}
