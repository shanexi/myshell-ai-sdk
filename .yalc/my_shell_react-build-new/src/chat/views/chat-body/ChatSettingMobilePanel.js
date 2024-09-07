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
exports.default = ChatSettingMobilePanel;
const jsx_runtime_1 = require("react/jsx-runtime");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const clsx_1 = __importDefault(require("clsx"));
const framer_motion_1 = require("framer-motion");
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner.js"));
const ChatSettingForm = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../chat-setting/ChatSettingForm.js'))), {
    loading: () => ((0, jsx_runtime_1.jsx)("div", { className: "h-[88px] w-full flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "md" }) })),
    ssr: false
});
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};
const Modal = ({ children, setOpen }) => {
    const controls = (0, framer_motion_1.useAnimationControls)();
    const [show, setShow] = (0, react_1.useState)(false);
    const isFull = (0, react_1.useRef)(false);
    const onPanEnd = (event, info) => {
        const { offset, velocity } = info;
        if (offset.y > 200 || velocity.y > 800) {
            controls.start({ y: '100%' });
            setOpen(false);
            setShow(false);
            isFull.current = false;
        }
        else if (offset.y < -100 || velocity.y < -500) {
            controls.start({ y: 0, opacity: 1 });
            isFull.current = true;
            setOpen(true);
            setShow(true);
        }
    };
    const handleClose = (e) => {
        controls.start({ y: '100%' });
        setOpen(false);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "w-full h-screen fixed top-0 left-0 z-[99] bg-alpha-mask-mobile", initial: "hidden", animate: "visible", exit: "hidden", onClick: handleClose, variants: overlayVariants }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: (0, clsx_1.default)('absolute w-full z-[200] shadow-modal-default', show ? 'h-full bottom-0 bg-surface' : 'rounded-t-3xl h-fit bottom-[100px]'), initial: { y: '25%' }, animate: controls, children: [show && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { style: { height: '48px' }, className: "flex justify-start items-center bg-surface", dragElastic: 0, dragConstraints: {
                            top: 0,
                            bottom: 0
                        }, onPanEnd: onPanEnd, children: (0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "w-8 h-8 ml-4 text-on-surface", onClick: () => setOpen(false) }) })), !show && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "absolute z-[11] flex justify-center w-full h-[40px]", onClick: handleClose, dragElastic: 0, dragConstraints: {
                            top: 0,
                            bottom: 0
                        }, onPanEnd: onPanEnd, children: (0, jsx_runtime_1.jsx)("div", { className: "mt-4 w-[50px] h-[4px] bg-[#C9C4D0] rounded-sm" }) })), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('overflow-scroll', show ? '' : 'rounded-t-3xl', isFull.current ? 'h-[calc(100%-48px)]' : 'h-fit'), children: children })] })] }));
};
function ChatSettingMobilePanel({ selectedBot, setOpen, botChatSetting }) {
    return ((0, jsx_runtime_1.jsx)(Modal, { setOpen: setOpen, children: (0, jsx_runtime_1.jsx)(ChatSettingForm, { botInfo: selectedBot, chatSetting: botChatSetting, showRadius: false }) }));
}
