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
exports.default = AsyncJobDisplay;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const react_use_1 = require("react-use");
const MessageContext_1 = require("../../../../../../chat-new/context/MessageContext.js");
const definitions_1 = require("../../../../../../chat-new/model/definitions.js");
const spinner_1 = __importDefault(require("../../../../../../common/components/ui/spinner.js"));
const typography_1 = require("../../../../../../common/components/ui/typography.js");
const default_display_1 = __importDefault(require("../default-display.js"));
const image_gen_display_1 = __importDefault(require("./image-gen-display/views/image-gen-display.js"));
const running_widget_info_1 = __importStar(require("./running-widget-info.js"));
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../../../common/components/MdViewer.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
function AsyncJobDisplay({ message, showText, showAudio }) {
    const { getJobInfo } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const intervalId = (0, react_1.useRef)(null);
    const pollingInterval = 2000;
    const polling = () => {
        const fn = async () => {
            if (message?.asyncJobInfo?.jobId) {
                const res = await getJobInfo?.(message.asyncJobInfo.jobId, message.id);
                return res;
            }
            return false;
        };
        if (message?.asyncJobInfo?.status === definitions_1.EmbedObjStatus.PENDING ||
            message?.asyncJobInfo?.status === definitions_1.EmbedObjStatus.PROCESSING ||
            message?.asyncJobInfo?.status === definitions_1.EmbedObjStatus.QUEUEING) {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }
            intervalId.current = setInterval(async () => {
                const keepPolling = await fn();
                if (!keepPolling) {
                    if (intervalId.current) {
                        clearInterval(intervalId.current);
                        intervalId.current = null;
                    }
                }
            }, pollingInterval);
        }
    };
    (0, react_use_1.useEffectOnce)(() => {
        polling();
    });
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    if (message?.status === 'CANCELED') {
        return (0, jsx_runtime_1.jsx)("p", { children: chatLocale('job_terminated') });
    }
    console.log('asyncJobInfo: ', message);
    if (message?.imageGenMessageResponse?.jobId) {
        return (0, jsx_runtime_1.jsx)(image_gen_display_1.default, { message: message, showText: showText, showAudio: showAudio });
    }
    if (message?.asyncJobInfo?.status === definitions_1.EmbedObjStatus.DONE ||
        message?.asyncJobInfo?.status === definitions_1.EmbedObjStatus.UNKNOWN) {
        if (message.runningError) {
            return (0, jsx_runtime_1.jsx)(running_widget_info_1.RunningError, { message: message });
        }
        return (0, jsx_runtime_1.jsx)(default_display_1.default, { message: message, showText: showText, showAudio: showAudio });
    }
    if (message?.asyncJobInfo?.status === definitions_1.EmbedObjStatus.ERROR) {
        return (0, jsx_runtime_1.jsx)(MdViewer, { className: "text-critical text-[14px]", content: message.text ?? '' });
    }
    if (message?.runningWidgetInfo?.length) {
        return (0, jsx_runtime_1.jsx)(running_widget_info_1.default, { list: message?.runningWidgetInfo });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(spinner_1.default, { size: "xs", className: "text-brand" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtle", className: "ml-2", children: message?.text })] }));
}
