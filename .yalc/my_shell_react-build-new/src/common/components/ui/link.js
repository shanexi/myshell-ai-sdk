"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = Link;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const link_2 = __importDefault(require("next-intl/link"));
const utils_1 = require("../../../lib/utils.js");
function Link({ className, href, scroll = false, replace = false, prefetch = true, children, onClick, ...props }) {
    const externalLink = /^(https?:\/\/)/.test(typeof href === 'string' ? href : `${href.pathname}`);
    const Component = externalLink ? link_1.default : link_2.default;
    return ((0, jsx_runtime_1.jsx)(Component, { href: href, scroll: scroll, replace: replace, prefetch: prefetch, onClick: onClick, className: (0, utils_1.cn)(className), rel: externalLink ? 'nofollow,noreferrer' : 'dofollow', ...props, children: children }));
}
exports.default = Link;
