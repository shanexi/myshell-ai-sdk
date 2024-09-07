"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUITheme = exports.getSchemeByTheme = exports.hexToRGBA = void 0;
function convertToKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
const hexToRGBA = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
exports.hexToRGBA = hexToRGBA;
const removeCSSProperties = (cssProperties) => {
    const root = document.documentElement;
    const existingCssText = root.style.cssText;
    const updatedCssText = existingCssText
        .split(';')
        .filter(property => {
        const [propertyName] = property.split(':');
        return !(propertyName.trim() in cssProperties);
    })
        .join(';');
    root.style.cssText = `${updatedCssText}`;
};
const setCSSProperties = (cssProperties) => {
    const root = document.documentElement;
    const existingCssText = root.style.cssText;
    const cssText = Object.entries(cssProperties)
        .map(([property, value]) => `${property}: ${value};`)
        .join(' ');
    root.style.cssText = `${existingCssText} ${cssText}`;
    return () => {
        removeCSSProperties(cssProperties);
    };
};
const getSchemeByTheme = (schemes, theme) => {
    const mode = schemes[theme];
    const properties = Object.keys(mode);
    const cssProperties = {};
    for (const key of properties) {
        const token = convertToKebabCase(key);
        cssProperties[`--${token}`] = mode[key];
    }
    return cssProperties;
};
exports.getSchemeByTheme = getSchemeByTheme;
const setUITheme = (schemes, theme) => {
    const cssProperties = (0, exports.getSchemeByTheme)(schemes, theme);
    if (cssProperties['--surface-variant']) {
        cssProperties['--surface-variant-99'] = `${cssProperties['--surface-variant']}99`;
    }
    return setCSSProperties(cssProperties);
};
exports.setUITheme = setUITheme;
