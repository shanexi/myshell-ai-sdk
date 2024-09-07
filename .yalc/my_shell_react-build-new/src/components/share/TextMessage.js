"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextMessage;
const jsx_runtime_1 = require("react/jsx-runtime");
function TextMessage({ chat }) {
    const { imageGenMessageResponse } = chat;
    let imageMsgData = {};
    if (imageGenMessageResponse) {
        const { metadata, genParam } = imageGenMessageResponse;
        imageMsgData = {
            ...(genParam || {}),
            ...(metadata || {})
        };
        if (imageMsgData.genType === 'IMAGE_GEN_MESSAGE_TYPE_UPSCALE_MESSAGE') {
            imageMsgData.text = '/ Upscale';
            imageMsgData.show = true;
        }
        if (imageMsgData.genType === 'IMAGE_GEN_MESSAGE_TYPE_VARIATION_MESSAGE') {
            imageMsgData.text = '/ Variation';
            imageMsgData.show = true;
        }
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-3/4 flex justify-end items-end space-x-2", children: chat.text && ((0, jsx_runtime_1.jsxs)("div", { className: "bg-surface-variant bg-opacity-[0.1] max-w-full w-fit rounded-[7px] py-[10px] px-[12px] leading-[21px] break-words whitespace-pre-line text-on-surface", children: [!imageMsgData.show && (0, jsx_runtime_1.jsx)("p", { className: "text-base whitespace-pre-wrap", children: chat.text }), imageMsgData.show && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "block", children: imageMsgData.text }), Number(imageMsgData.batchCount || 0) > 1 && ((0, jsx_runtime_1.jsxs)("span", { className: "border border-[#CCD4FF] dark:border-[#2B3561] rounded-md overflow-hidden mt-2 inline-block mr-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "bg-[#CCD4FF] dark:bg-[#2B3561] p-1.5  inline-block rounded-r-md", children: "Group" }), (0, jsx_runtime_1.jsx)("span", { className: "px-1.5", children: Number(imageMsgData.batchNumber) + 1 })] })), (0, jsx_runtime_1.jsxs)("span", { className: "border border-[#CCD4FF] dark:border-[#2B3561] rounded-md overflow-hidden mt-2 inline-block", children: [(0, jsx_runtime_1.jsx)("span", { className: "bg-[#CCD4FF] dark:bg-[#2B3561] p-1.5  inline-block rounded-r-md", children: "Number" }), (0, jsx_runtime_1.jsx)("span", { className: "px-1.5", children: Number(imageMsgData.imageNumber) + 1 })] })] }))] })) }));
}
