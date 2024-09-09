import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { cn } from '../../lib/utils.js';
import WidgetDesc from '../../components/chat/entity-detail/views/widget/WidgetDesc.js';
import { Tooltip } from './ui/tooltip.js';
export default function Tag({ tag, index, className }) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    return (_jsx(Tooltip, { description: index === 0 ? _jsx(WidgetDesc, {}) : tag.extra?.hoverText ?? '', disabled: !tag.extra?.isShowHover, contentClassName: "flex-shrink-0", showArrow: false, children: _jsx("div", { className: cn('py-[3px] px-2 h-[22px] shrink-0 flex items-center rounded-md', className), style: {
                backgroundColor: isDark
                    ? `${tag?.backgroundColors?.dark || '#27282c'}`
                    : `${tag?.backgroundColors?.light || '#f6f6f7'}`
            }, children: _jsxs("div", { className: "flex justify-center text-xs font-bold line-clamp-1 text-ellipsis space-x-1", style: {
                    color: isDark ? `${tag?.labelColors?.dark}` : `${tag?.labelColors?.light}`
                }, children: [tag.iconUrl ? _jsx(Image, { src: tag.iconUrl, alt: "emoji img", width: 16, height: 16, className: "w-4 h-4" }) : null, _jsx("span", { className: "text-xs font-medium line-clamp-1 text-ellipsis", children: tag.label })] }) }) }));
}
