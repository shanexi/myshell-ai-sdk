import { jsx as _jsx } from "react/jsx-runtime";
import LinkComponent from 'next/link';
import LinkIntlComponent from 'next-intl/link';
import { cn } from '../../../lib/utils.js';
export function Link({ className, href, scroll = false, replace = false, prefetch = true, children, onClick, ...props }) {
    const externalLink = /^(https?:\/\/)/.test(typeof href === 'string' ? href : `${href.pathname}`);
    const Component = externalLink ? LinkComponent : LinkIntlComponent;
    return (_jsx(Component, { href: href, scroll: scroll, replace: replace, prefetch: prefetch, onClick: onClick, className: cn(className), rel: externalLink ? 'nofollow,noreferrer' : 'dofollow', ...props, children: children }));
}
export default Link;
