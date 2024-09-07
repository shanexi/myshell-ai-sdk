"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const common_1 = require("../../../../../apis/common.js");
const ImageOverview_1 = __importDefault(require("./ImageOverview.js"));
const VideoOverview_1 = __importDefault(require("./VideoOverview.js"));
const ImgVideoPreview_1 = __importDefault(require("./preview/ImgVideoPreview.js"));
function ImgVideoList({ imgVideoList, driving, isImageGenerator, messageId }) {
    const fileLen = imgVideoList.length;
    const [viewModalVisible, setViewModalVisible] = (0, react_1.useState)(false);
    const [index, setIndex] = (0, react_1.useState)(0);
    const onOpenViewModal = (index) => {
        if (!driving) {
            setIndex(index ?? 0);
            setViewModalVisible(true);
        }
    };
    const singleFileDimension = (0, react_1.useMemo)(() => {
        const singleFileItem = imgVideoList[0];
        if (singleFileItem.mediaFileMetadata?.width && singleFileItem.mediaFileMetadata.height) {
            const w = singleFileItem.mediaFileMetadata.width;
            const h = singleFileItem.mediaFileMetadata.height;
            if (w < 240) {
                return { width: w, height: h };
            }
            return { width: 240, height: h * (240 / w) };
        }
        return { width: 240, height: 0 };
    }, [imgVideoList]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('rounded-xl overflow-hidden max-w-full', fileLen > 1 && 'w-[263px] lg:w-[323.52px] xl:w-[487.35px] 2xl:w-[651.2px]'), style: fileLen === 1
                    ? {
                        width: singleFileDimension.width,
                        height: singleFileDimension.height ? singleFileDimension.height : 'auto'
                    }
                    : {}, children: fileLen === 1 ? ((0, jsx_runtime_1.jsx)("div", { className: "rounded-xl overflow-hidden w-full h-full", children: (0, jsx_runtime_1.jsx)(MemorizedDisplayItem, { type: imgVideoList[0].type, url: imgVideoList[0].url, clickEvent: () => onOpenViewModal(), customClass: "w-full", imageModel: imgVideoList[0]?.mediaFileMetadata?.generateModel, isImageGenerator: isImageGenerator, messageId: messageId, index: 0 }) })) : fileLen === 2 || fileLen === 4 ? ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-1 w-full", children: imgVideoList.map((file, index) => ((0, jsx_runtime_1.jsx)(MemorizedDisplayItem, { type: file.type, url: file.url, clickEvent: () => onOpenViewModal(index), customClass: "aspect-square w-full", imageModel: file?.mediaFileMetadata?.generateModel, isImageGenerator: isImageGenerator, index: index }, file.url + index))) })) : fileLen === 3 ? ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-1 w-full", children: [(0, jsx_runtime_1.jsx)(MemorizedDisplayItem, { type: imgVideoList[0].type, url: imgVideoList[0].url, clickEvent: () => onOpenViewModal(), customClass: "aspect-[5/4] md:aspect-[2] col-span-2 w-full", imageModel: imgVideoList[0]?.mediaFileMetadata?.generateModel, isImageGenerator: isImageGenerator, index: 0 }), imgVideoList.slice(1).map((file, index) => ((0, jsx_runtime_1.jsx)(MemorizedDisplayItem, { type: file.type, url: file.url, clickEvent: () => onOpenViewModal(1 + index), customClass: "aspect-square w-full", imageModel: file?.mediaFileMetadata?.generateModel, isImageGenerator: isImageGenerator, index: index }, file.url + index)))] })) : fileLen === 5 || fileLen === 8 ? ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-6 gap-1 w-full", children: [(0, jsx_runtime_1.jsx)(MemorizedDisplayItem, { type: imgVideoList[0].type, url: imgVideoList[0].url, clickEvent: () => onOpenViewModal(), customClass: "aspect-square col-span-3 w-full", imageModel: imgVideoList[0]?.mediaFileMetadata?.generateModel, isImageGenerator: isImageGenerator, index: 0 }), (0, jsx_runtime_1.jsx)(MemorizedDisplayItem, { type: imgVideoList[1].type, url: imgVideoList[1].url, clickEvent: () => onOpenViewModal(1), customClass: "aspect-square col-span-3 w-full", imageModel: imgVideoList[1]?.mediaFileMetadata?.generateModel, isImageGenerator: isImageGenerator, index: 1 }), imgVideoList.slice(2).map((file, index) => ((0, jsx_runtime_1.jsx)(MemorizedDisplayItem, { type: file.type, url: file.url, clickEvent: () => onOpenViewModal(2 + index), customClass: "col-span-2 aspect-square w-full", imageModel: file?.mediaFileMetadata?.generateModel, isImageGenerator: isImageGenerator, index: index }, file.url + index)))] })) : fileLen === 6 || fileLen === 9 ? ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-3 gap-1 w-full", children: imgVideoList.map((file, index) => ((0, jsx_runtime_1.jsx)(MemorizedDisplayItem, { type: file.type, url: file.url, clickEvent: () => onOpenViewModal(index), customClass: "aspect-square w-full", imageModel: file?.mediaFileMetadata?.generateModel, isImageGenerator: isImageGenerator, index: index }, file.url + index))) })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 w-full", children: [(0, jsx_runtime_1.jsx)(MemorizedDisplayItem, { type: imgVideoList[0].type, url: imgVideoList[0].url, clickEvent: () => onOpenViewModal(), customClass: (0, clsx_1.default)('w-full', fileLen === 7 ? 'aspect-[2]' : 'aspect-[5/4] md:aspect-[2]'), imageModel: imgVideoList[0]?.mediaFileMetadata?.generateModel, isImageGenerator: isImageGenerator, index: 0 }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-3 gap-1 w-full", children: imgVideoList.slice(1).map((file, index) => ((0, jsx_runtime_1.jsx)(MemorizedDisplayItem, { type: file.type, url: file.url, clickEvent: () => onOpenViewModal(1 + index), customClass: "aspect-square w-full", imageModel: file?.mediaFileMetadata?.generateModel, isImageGenerator: isImageGenerator, index: index }, file.url + index))) })] })) }), (0, jsx_runtime_1.jsx)(ImgVideoPreview_1.default, { open: viewModalVisible, onClose: () => {
                    setIndex(0);
                    setViewModalVisible(false);
                }, imgVideoList: imgVideoList, activeIndex: index })] }));
}
function DisplayItem({ type, url, imageModel, clickEvent, customClass, isImageGenerator, messageId, index }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: type === common_1.EmbedObjType.IMAGE ? ((0, jsx_runtime_1.jsx)(ImageOverview_1.default, { url: url, imageModel: imageModel, onViewImage: clickEvent, customClass: customClass, isImageGenerator: isImageGenerator, messageId: messageId, index: index })) : ((0, jsx_runtime_1.jsx)(VideoOverview_1.default, { url: url, onViewVideo: clickEvent, customClass: customClass })) }));
}
const MemorizedDisplayItem = (0, react_1.memo)(DisplayItem);
const MediaFileList = (0, react_1.memo)(ImgVideoList);
exports.default = MediaFileList;
