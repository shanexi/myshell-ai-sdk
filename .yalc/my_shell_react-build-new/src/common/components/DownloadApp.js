"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DownloadApp;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const button_1 = require("../../common/components/ui/button.js");
const phone_1 = require("../../common/components/ui/icons/solid/phone.js");
const image_1 = require("../../common/components/ui/image.js");
const tooltip_1 = require("../../common/components/ui/tooltip.js");
const common_helper_1 = require("../utils/common-helper.js");
function DownloadApp({ isMobile }) {
    const t = (0, next_intl_1.useTranslations)('profile');
    const goDownload = () => {
        window.open('https://app.appsflyer.com/id6448938313?pid=downloadiosfromprofile', '_blank');
    };
    if (isMobile && !(0, common_helper_1.isIos)()) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full mb-5", children: isMobile ? ((0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: goDownload, variant: "primary", color: "default", size: "lg", isBlock: true, children: [(0, jsx_runtime_1.jsx)(phone_1.Phone, { className: "mr-2 mb-0.5" }), t('download_ios_app')] })) : ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: (0, jsx_runtime_1.jsx)(image_1.Image, { width: "180px", height: "180px", src: "https://image.myshell.ai/image/chat/embed_obj/3510090/202406060842/myshll.png" }), children: (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: goDownload, variant: "primary", color: "default", size: "lg", isBlock: true, children: [(0, jsx_runtime_1.jsx)(phone_1.Phone, { className: "mr-2 mb-0.5" }), t('download_ios_app')] }) })) }));
}
