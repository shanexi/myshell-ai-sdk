"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotCardTags = BotCardTags;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
function BotCardTags({ bot, tags, langDisplayName, tagOptions, energyPerChat, className, outputVoice }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const tagsArr = (tags && tags?.split(',')) || [];
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-full flex flex-wrap', className || ''), children: tagsArr.map(item => {
            const tag = tagOptions.filter(e => item === e.id)?.[0];
            if (!tag?.label)
                return null;
            return ((0, jsx_runtime_1.jsx)("div", { className: "pr-1.5 pb-1.5", children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('px-[8px] h-[22px] flex items-center rounded-[6px]'), style: {
                        backgroundColor: isDark ? `${tag?.backgroundColors?.dark}` : `${tag?.backgroundColors?.light}`
                    }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center text-xs font-bold", style: {
                            color: isDark ? `${tag?.labelColors?.dark}` : `${tag?.labelColors?.light}`
                        }, children: [tag.iconUrl ? ((0, jsx_runtime_1.jsx)("img", { src: `${tag.iconUrl}`, alt: "emoji img", className: "mr-[2px] w-[14px] h-[14px]" })) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold line-clamp-1 text-ellipsis", children: tag.label })] }) }) }, tag.id));
        }) }));
}
