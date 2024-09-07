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
exports.default = TranslationDisplay;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowPathIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowPathIcon"));
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const react_use_1 = require("react-use");
const MessageContext_1 = require("../../../../../../chat-new/context/MessageContext.js");
const typography_1 = require("../../../../../../common/components/ui/typography.js");
const display_provider_1 = require("../../display-provider/index.js");
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../../../common/components/MdViewer.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
function TranslationDisplay() {
    const { translationStatus, translate } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const { message } = (0, display_provider_1.useDisplayContext)();
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    const onTranslate = () => {
        translate?.(message?.id);
    };
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
    (0, react_use_1.useEffectOnce)(() => {
        if (!message?.translation) {
            onTranslate();
        }
    });
    if (message?.translation) {
        return (0, jsx_runtime_1.jsx)(MdViewer, { content: `${quotedReference ?? ''}${message.translation}` });
    }
    if (translationStatus === 'TRANSLATING') {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { className: "leading-7", children: chatLocale('translating') }), (0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { className: "animate-spin size-[18px]" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { className: "leading-7", children: chatLocale('translation_failed') }), (0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { className: "size-[18px] ", onClick: onTranslate })] }));
}
