"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LargeImgModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const common_helper_1 = require("../../../../../../../../common/utils/common-helper.js");
function LargeImgModal({ imgPath, open, onClose }) {
    return ((0, jsx_runtime_1.jsx)(react_1.Modal, { isOpen: open, onClose: onClose, isCentered: true, size: "full", scrollBehavior: "outside", motionPreset: "none", children: (0, jsx_runtime_1.jsx)(react_1.ModalContent, { children: (0, jsx_runtime_1.jsx)(react_1.ModalBody, { p: 0, display: "flex", justifyContent: "center", alignItems: "center", bgColor: "black", className: "yyyyy", children: (0, jsx_runtime_1.jsx)(react_1.Box, { maxW: {
                        md: '1440px'
                    }, w: "full", children: (0, jsx_runtime_1.jsx)(react_1.Image, { alt: "large-image", src: (0, common_helper_1.getAssetsUrl)(imgPath), w: "full", h: "fit-content", cursor: "zoom-out", onClick: onClose }) }) }) }) }));
}
