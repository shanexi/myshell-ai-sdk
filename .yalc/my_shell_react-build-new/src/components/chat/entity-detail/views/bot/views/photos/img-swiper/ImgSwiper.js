"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImgSwiper;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ChevronLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronLeftIcon"));
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronRightIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const framer_motion_1 = require("framer-motion");
const next_intl_1 = require("next-intl");
const popmotion_1 = require("popmotion");
const react_2 = require("react");
const DeleteIcon_1 = __importDefault(require("../../../../../../../../common/components/icons/workshop/DeleteIcon.js"));
const LargeImgModal_1 = __importDefault(require("./LargeImgModal.js"));
const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};
function ImgSwiper({ imgList, activeIndex, open, onClose, onDelete, deleting, deletable }) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const [[index, direction], setIndex] = (0, react_2.useState)([activeIndex, 0]);
    const [fullModalVisible, setFullModalVisible] = (0, react_2.useState)(false);
    const imageIndex = (0, popmotion_1.wrap)(0, imgList.length, index);
    const paginate = (newDirection) => {
        setIndex([index + newDirection, newDirection]);
    };
    (0, react_2.useEffect)(() => {
        if (imgList.length === 0) {
            onClose();
        }
    }, [imgList]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!fullModalVisible && ((0, jsx_runtime_1.jsx)(react_1.Modal, { closeOnEsc: true, closeOnOverlayClick: true, isOpen: open, onClose: onClose, isCentered: true, size: "full", motionPreset: "none", children: (0, jsx_runtime_1.jsx)(react_1.ModalContent, { className: "z-[1000] bg-surface-variant xxxx", children: (0, jsx_runtime_1.jsxs)(react_1.ModalBody, { p: 0, display: "flex", justifyContent: "center", alignItems: "center", position: "relative", children: [(0, jsx_runtime_1.jsx)(react_1.Box, { position: "absolute", top: 0, left: 0, w: "full", h: "full", onClick: onClose, zIndex: 1 }), (0, jsx_runtime_1.jsx)(react_1.ModalCloseButton, { visibility: {
                                    base: 'hidden',
                                    md: 'visible'
                                }, zIndex: 2, position: "absolute", top: "20px", right: "20px", className: "text-on-surface" }), (0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "w-8 h-8 absolute top-[14px] left-4 text-on-surface block sm:hidden", onClick: onClose, fontSize: "20px" }), (0, jsx_runtime_1.jsx)(react_1.Center, { onClick: () => paginate(-1), w: "44px", h: "44px", rounded: "full", position: "absolute", left: { base: '16px', md: '44px' }, top: "50%", translateY: "-50%", boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.12)", cursor: "pointer", zIndex: 2, className: "bg-secondary-container", children: (0, jsx_runtime_1.jsx)(ChevronLeftIcon_1.default, { className: "text-on-secondary-container w-5 h-5" }) }), (0, jsx_runtime_1.jsx)(react_1.Box, { h: {
                                    base: 'auto',
                                    md: '80vh'
                                }, maxH: "700px", w: {
                                    base: 'full',
                                    md: 'auto'
                                }, className: "aspect-square", position: "relative", overflow: "hidden", children: (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { initial: false, custom: direction, children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.img, { className: "absolute w-full h-full object-scale-down cursor-zoom-in", src: imgList[imageIndex]?.originImageUrl, custom: direction, variants: variants, initial: "enter", animate: "center", exit: "exit", transition: {
                                            x: { type: 'spring', stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 }
                                        }, drag: "x", dragConstraints: { left: 0, right: 0 }, dragElastic: 1, onDragEnd: (e, { offset, velocity }) => {
                                            const swipe = swipePower(offset.x, velocity.x);
                                            if (swipe < -swipeConfidenceThreshold) {
                                                paginate(1);
                                            }
                                            else if (swipe > swipeConfidenceThreshold) {
                                                paginate(-1);
                                            }
                                        }, onClick: () => setFullModalVisible(true) }, index) }) }), (0, jsx_runtime_1.jsx)(react_1.Center, { onClick: () => paginate(1), w: "44px", h: "44px", rounded: "full", position: "absolute", right: { base: '16px', md: '44px' }, top: "50%", translateY: "-50%", bgColor: "white", boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.12)", cursor: "pointer", zIndex: 2, className: "bg-secondary-container", children: (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { className: "text-on-secondary-container w-5 h-5" }) }), deletable && ((0, jsx_runtime_1.jsx)(react_1.Flex, { position: "absolute", bottom: 0, left: 0, w: "full", h: "10vh", justifyContent: "center", alignItems: "center", zIndex: 2, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", h: "36px", rounded: "12px", fontSize: "12px", lineHeight: "16px", p: "6px 12px", color: "#EC2F0D", border: "1px solid var(--border)", onClick: () => onDelete(imgList[imageIndex].id), isLoading: deleting, display: "flex", justifyContent: "center", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(DeleteIcon_1.default, { fontSize: "24px" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-[6px]", children: commonT('delete') })] }) }))] }) }) })), fullModalVisible && ((0, jsx_runtime_1.jsx)(LargeImgModal_1.default, { imgPath: imgList[imageIndex]?.originImageUrl, open: fullModalVisible, onClose: () => setFullModalVisible(false) }))] }));
}
