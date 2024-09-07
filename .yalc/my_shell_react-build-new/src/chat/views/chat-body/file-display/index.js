"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileDisplay;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const common_1 = require("../../../../apis/common.js");
const Doc_1 = __importDefault(require("./Doc.js"));
const audio_1 = __importDefault(require("./audio/index.js"));
const img_video_1 = __importDefault(require("./img-video/index.js"));
function FileDisplay({ embedObjs, driving, isImageGenerator, messageId }) {
    const validEmbedObjs = (0, react_1.useMemo)(() => {
        return embedObjs.filter(embed => embed.type !== common_1.EmbedObjType.UNKNOWN &&
            embed.type !== common_1.EmbedObjType.AUDIO_CONTENT &&
            embed.type !== common_1.EmbedObjType.TEXT_CONTENT);
    }, [embedObjs]);
    const imgVideoList = (0, react_1.useMemo)(() => {
        return validEmbedObjs.filter(embed => embed.type === common_1.EmbedObjType.IMAGE || embed.type === common_1.EmbedObjType.VIDEO);
    }, [validEmbedObjs]);
    const otherFileList = (0, react_1.useMemo)(() => {
        return validEmbedObjs.filter(embed => embed.type === common_1.EmbedObjType.AUDIO || embed.type === common_1.EmbedObjType.DOC);
    }, [validEmbedObjs]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 w-full", children: [!!imgVideoList.length && ((0, jsx_runtime_1.jsx)(img_video_1.default, { isImageGenerator: isImageGenerator, driving: driving, imgVideoList: imgVideoList, messageId: messageId })), !!otherFileList.length &&
                otherFileList.map(file => file.type === common_1.EmbedObjType.DOC || file.type === common_1.EmbedObjType.TEXT_CONTENT ? ((0, jsx_runtime_1.jsx)(Doc_1.default, { doc: file }, file.url)) : ((0, jsx_runtime_1.jsx)(audio_1.default, { title: file.title, url: file.url }, file.url)))] }));
}
