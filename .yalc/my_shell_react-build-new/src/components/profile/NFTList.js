"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function NFTList({ nfts }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full md:h-[560px] overflow-y-auto", children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 xs:grid-cols-2 space-y-2 py-3 px-1.5 gap-2.5 pb-5 md:grid-cols-4", children: nfts?.map((item, index) => {
                return ((0, jsx_runtime_1.jsx)("div", { className: "p-1.5 min-w-[174px] min-h-[174px] rounded-xl overflow-hidden transition-all hover:bg-surface-hovered", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col justify-center items-center space-y-3 rounded-xl overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full h-[174px] rounded-xl cursor-pointer bg-[#F6F6F7] dark:bg-[#323339] overflow-hidden", style: {
                                    backgroundImage: `url(${item.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }, onClick: () => {
                                    item.link && window.open(item.link, '_blank');
                                }, children: (0, jsx_runtime_1.jsx)("video", { src: item.video, loop: true, autoPlay: true, muted: true, playsInline: true, disablePictureInPicture: true, className: "w-full h-full block object-fit rounded-xl ease-in-out duration-300 hover:scale-105 overflow-hidden object-cover" }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-center text-default font-medium", children: item.name })] }) }, item.tokenId));
            }) }) }));
}
exports.default = NFTList;
