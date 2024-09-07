"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotTags = BotTags;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const next_themes_1 = require("next-themes");
const tooltip_1 = require("../../../common/components/ui/tooltip.js");
const WidgetDesc_1 = __importDefault(require("../../../components/chat/entity-detail/views/widget/WidgetDesc.js"));
function BotTags({ bot, showCount, className, childClassName, isWorkshop = false }) {
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    const tagList = (isWorkshop ? bot?.allTagList : bot?.tagList);
    const list = showCount && showCount > 0 && tagList.length > showCount ? tagList.slice(0, showCount) : tagList;
    return list?.length ? ((0, jsx_runtime_1.jsx)("div", { className: `w-full flex items-center flex-wrap space-y-1 ${className}`, children: list?.map((item, index) => {
            return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: index === 0 ? (0, jsx_runtime_1.jsx)(WidgetDesc_1.default, {}) : item.extra?.hoverText ?? '', disabled: !item.extra?.isShowHover, children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('px-2 h-[22px] flex-shrink-0 flex items-center rounded-[6px] mb-1 mr-1.5', childClassName), style: {
                        backgroundColor: isDark
                            ? `${item?.backgroundColors?.dark || '#27282c'}`
                            : `${item?.backgroundColors?.light || '#f6f6f7'}`
                    }, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex justify-center text-xs font-bold line-clamp-1 text-ellipsis'), style: {
                            color: isDark ? `${item?.labelColors?.dark}` : `${item?.labelColors?.light}`
                        }, children: [item.iconUrl ? ((0, jsx_runtime_1.jsx)("img", { src: `${item.iconUrl}`, alt: "emoji img", className: "mr-[2px] w-[14px] h-[14px]" })) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold line-clamp-1 text-ellipsis", children: item.label })] }) }) }, `tag${item.id}`));
        }) })) : null;
}
