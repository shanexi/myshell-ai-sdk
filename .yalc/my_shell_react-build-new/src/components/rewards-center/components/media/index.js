"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const InlineVideoPlayer_1 = __importDefault(require("../../../../common/components/InlineVideoPlayer.js"));
const common_helper_1 = require("../../../../common/utils/common-helper.js");
;
const Media = ({ src }) => {
    if ((0, common_helper_1.isVideo)((0, common_helper_1.getFileExtension)(src))) {
        return ((0, jsx_runtime_1.jsx)(InlineVideoPlayer_1.default, { src: src }));
    }
    return ((0, jsx_runtime_1.jsx)("img", { className: "w-full h-full object-cover", src: src, alt: "awards" }));
};
exports.Media = Media;
