"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserLoginTypeIcon;
const jsx_runtime_1 = require("react/jsx-runtime");
const DocumentDuplicateIcon_1 = __importDefault(require("@heroicons/react/24/outline/DocumentDuplicateIcon"));
const EnvelopeIcon_1 = __importDefault(require("@heroicons/react/24/outline/EnvelopeIcon"));
const image_1 = __importDefault(require("next/image"));
const apple_svg_1 = __importDefault(require("@/common/assets/icons/login/apple.svg"));
const facebook_svg_1 = __importDefault(require("@/common/assets/icons/login/facebook.svg"));
const google_svg_1 = __importDefault(require("@/common/assets/icons/login/google.svg"));
const user_1 = require("../../../../common/constants/enums/user.js");
function UserLoginTypeIcon({ loginType }) {
    if (!loginType)
        return null;
    switch (loginType) {
        case user_1.LoginType.LOGIN_TYPE_APPLE:
            return (0, jsx_runtime_1.jsx)(image_1.default, { alt: "apple", src: apple_svg_1.default, width: 20, height: 20, className: "mt-1.5 mr-1.5" });
        case user_1.LoginType.LOGIN_TYPE_FACEBOOK:
            return (0, jsx_runtime_1.jsx)(image_1.default, { alt: "facebook", src: facebook_svg_1.default, width: 20, height: 20, className: "mt-1.5 mr-1.5" });
        case user_1.LoginType.LOGIN_TYPE_EMAIL:
            return (0, jsx_runtime_1.jsx)(EnvelopeIcon_1.default, { className: "w-5 h-5 mt-1.5 mr-1.5 select-none" });
        case user_1.LoginType.LOGIN_TYPE_GOOGLE:
            return ((0, jsx_runtime_1.jsx)("div", { className: "w-5 h-5 border border-default rounded-full flex justify-center items-center mt-1.5 mr-1.5 bg-white", children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "google", src: google_svg_1.default, width: 20, height: 20 }) }));
        case user_1.LoginType.LOGIN_TYPE_PUBLIC_ADDRESS:
            return (0, jsx_runtime_1.jsx)(DocumentDuplicateIcon_1.default, { className: "w-5 h-5 mt-1.5 mr-1.5 stroke-primary cursor-pointer" });
        case user_1.LoginType.LOGIN_TYPE_UNSPECIFIED:
            return null;
    }
}
