"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImgDisplay;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const react_2 = require("react");
const DeleteIcon_1 = __importDefault(require("../../../../../../../common/components/icons/workshop/DeleteIcon.js"));
const useDevice_1 = require("../../../../../../../common/hooks/useDevice.js");
function ImgDisplay({ imgSrc, onOpenImgSwiperModal, onDeleteImg, deletable }) {
    const [deleteVisible, setDeleteVisible] = (0, react_2.useState)(false);
    const handleClick = () => {
        onOpenImgSwiperModal();
    };
    const handleDelete = (e) => {
        e.stopPropagation();
        onDeleteImg?.();
    };
    const { isMobile } = (0, useDevice_1.useDevice)();
    return ((0, jsx_runtime_1.jsxs)(react_1.Box, { className: "relative aspect-square cursor-pointer", onClick: handleClick, ...(!isMobile && deletable
            ? {
                onMouseOver: () => {
                    setDeleteVisible(true);
                },
                onMouseLeave: () => {
                    setDeleteVisible(false);
                }
            }
            : {}), children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: imgSrc, alt: "bot description image", fill: true, quality: 100, sizes: "(max-width: 768px) 100vw,100vw", className: "object-cover" }), deleteVisible && deletable && ((0, jsx_runtime_1.jsx)(react_1.Center, { p: "4px", position: "absolute", top: "12px", right: "12px", onClick: handleDelete, rounded: "6px", border: "1px solid var(--border)", bgColor: "white", className: "hidden md:block", children: (0, jsx_runtime_1.jsx)(DeleteIcon_1.default, { fontSize: "24px", color: "#EC2F0D" }) }))] }, imgSrc));
}
