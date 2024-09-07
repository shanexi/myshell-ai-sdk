"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Logo;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_use_1 = require("react-use");
const avatar_1 = require("../../../../../../common/components/ui/avatar.js");
const utils_1 = require("../../../../../../lib/utils.js");
function Logo({ src, className }) {
    const isMd = (0, react_use_1.useMedia)('(min-width: 768px)');
    return (0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: isMd ? '2xl' : 'xl', src: src, className: (0, utils_1.cn)('shrink-0', className) });
}
