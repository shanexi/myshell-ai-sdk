"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const identityService_1 = require("../../common/services/identityService.js");
const link_1 = require("./ui/link.js");
const typography_1 = require("./ui/typography.js");
const usePathLocale_1 = require("../hooks/usePathLocale.js");
function SectionHeader(props) {
    const { title, rightClickUrl, rightMobileClickUrl, rightTitle, page } = props;
    const { isMobile, pathname } = (0, usePathLocale_1.usePathLocale)();
    const linkUrl = isMobile ? rightMobileClickUrl : rightClickUrl;
    const linkClickHandle = () => {
        const search = linkUrl?.split('?')?.[1] || '';
        if (search) {
            identityService_1.identityService.setPageSearch(page, `?${search}`);
        }
        const element = document.getElementById('position-tag');
        element && element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        sessionStorage.setItem(`more-link${pathname}`, 'true');
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex items-center justify-between px-4 md:px-2.5 mb-3", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", className: "text-lg md:text-xl", children: title }), linkUrl && ((0, jsx_runtime_1.jsx)(link_1.Link, { href: linkUrl, prefetch: true, onClick: linkClickHandle, children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "regular", className: "text-brand", children: rightTitle }) }))] }));
}
exports.default = SectionHeader;
