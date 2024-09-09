"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHljsCss = void 0;
const next_themes_1 = require("next-themes");
const useClientCss_1 = require("../../common/hooks/useClientCss");
exports.useHljsCss = typeof window !== 'undefined'
    ? () => {
        const { resolvedTheme } = (0, next_themes_1.useTheme)();
        (0, useClientCss_1.useClientCss)(resolvedTheme === 'dark' ? '/github-dark.css' : '/github.css');
    }
    : () => {
    };
