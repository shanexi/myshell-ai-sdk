"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NFTs;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const image_1 = __importDefault(require("next/image"));
const typography_1 = require("../../../../../../common/components/ui/typography.js");
const link_1 = __importDefault(require("next/link"));
function NFTs(props) {
    const { nftItems } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const decorateName = (name, tokenId) => {
        if (name.includes('MySoul')) {
            return `MySoul #${tokenId}`;
        }
        if (name.includes('Creator Pass')) {
            return `Myshell Creator Pass #${tokenId}`;
        }
    };
    const renderEmpty = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col items-center justify-center gap-3 h-[260px]", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/reward-center/flash.svg", width: 32, height: 32, alt: "no assets" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-xs w-fit", children: t('no_asset') })] }));
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full overflow-y-auto flex gap-4", children: nftItems.length === 0
            ? renderEmpty()
            : nftItems.map(nft => {
                const { name, image, tokenId, link } = nft;
                return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1.5 mt-4", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: link, target: "_blank", rel: "noopener noreferrer", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: image, width: 156, height: 156, alt: "nft", className: "rounded-xl" }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-xs w-fit", weight: "medium", children: decorateName(name, tokenId) })] }, name));
            }) }));
}
