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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const LAppDefine = __importStar(require("./Manager/lappdefine.js"));
const lappdelegate_1 = require("./Manager/lappdelegate.js");
const lapplive2dmanager_1 = require("./Manager/lapplive2dmanager.js");
const lappwavfilehandler_1 = require("./Manager/lappwavfilehandler.js");
function ReactLive2d(props) {
    const { isOpen, isTalking, live2dModelLoad, botInfo } = props;
    const [yDelta, setYDelta] = (0, react_2.useState)(0);
    const [modelLoaded, setModelLoaded] = (0, react_2.useState)(false);
    const [modelHeight, setModelHeight] = (0, react_2.useState)(0);
    const t = (0, next_intl_1.useTranslations)('chat');
    const onLive2DModelLoad = () => {
        live2dModelLoad?.();
        setModelLoaded(true);
    };
    (0, react_2.useEffect)(() => {
        if (!botInfo) {
            return;
        }
        if (isOpen) {
            if (!botInfo.voiceCall.param) {
                return;
            }
            const voiceCallParam = JSON.parse(botInfo.voiceCall.param);
            if (!voiceCallParam.live2d) {
                return;
            }
            const { modelHeightDelta } = voiceCallParam.live2d;
            const { modelName } = voiceCallParam.live2d;
            const container = document.getElementById('live2d-container');
            if (container) {
                const topWhite = 50;
                const yDel = 50 - modelHeightDelta;
                const clientHeight = container?.parentElement?.parentElement?.clientHeight;
                if (!clientHeight) {
                    return;
                }
                const modelHeight = clientHeight - topWhite;
                setModelHeight(modelHeight);
                setYDelta(yDel);
                if (!lappdelegate_1.LAppDelegate.getInstance().initialize({
                    element: container,
                    modelHeightDelta,
                    modelSize: modelHeight,
                    scale: voiceCallParam.live2d?.scale,
                    transY: voiceCallParam.live2d?.transY,
                    onLive2DModelLoad
                }, modelName)) {
                    return;
                }
                lappdelegate_1.LAppDelegate.getInstance().run();
            }
        }
        return () => {
            if (isOpen && lappdelegate_1.LAppDelegate.getInstance()._isInit) {
                lappdelegate_1.LAppDelegate.releaseInstance();
            }
        };
    }, [isOpen]);
    (0, react_2.useEffect)(() => {
        if (!lappdelegate_1.LAppDelegate.getInstance()._isInit) {
            return;
        }
        if (isTalking) {
            talk();
        }
        else {
            stopTalk();
        }
    }, [isTalking]);
    const talk = async () => {
        const instance = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        instance._models.at(0).startRandomMotion(LAppDefine.MotionGroupTapBody, LAppDefine.PriorityNormal);
    };
    const stopTalk = async () => {
        const instance = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        const wav = lappwavfilehandler_1.LAppWavFileHandler.getInstance();
        instance._models.at(0).startRandomMotion(LAppDefine.MotionGroupIdle, LAppDefine.PriorityForce);
        wav.releasePcmData();
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center relative", children: (0, jsx_runtime_1.jsx)("div", { id: "live2d-container", className: "absolute", style: {
                top: yDelta
            }, children: !modelLoaded && ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center gap-2", style: {
                    height: modelHeight
                }, children: [(0, jsx_runtime_1.jsx)(react_1.Spinner, { thickness: "4px", speed: "0.65s", emptyColor: "gray.200", color: "blue.500", width: "100px", height: "100px" }), (0, jsx_runtime_1.jsx)("div", { className: "text-white", children: t('voice_call_live2d_loading') })] })) }) }));
}
exports.default = ReactLive2d;
