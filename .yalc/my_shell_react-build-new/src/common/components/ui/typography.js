"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Description = exports.Paragraph = exports.Text = exports.SubTitle = exports.SubHeading = exports.Title = exports.Display = exports.Heading = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const class_variance_authority_1 = require("class-variance-authority");
const isomorphic_dompurify_1 = require("isomorphic-dompurify");
const lodash_es_1 = require("lodash-es");
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils");
const colorMap = {
    default: 'text-default',
    subtle: 'text-subtle',
    subtler: 'text-subtler',
    subtlest: 'text-subtlest',
    disabled: 'text-disabled',
    inverse: 'text-inverse',
    'inverse-primary': 'text-inverse-primary',
    'inverse-surface': 'text-inverse-surface',
    static: 'text-static',
    'static-black': 'text-static-black',
    brand: 'text-brand',
    critical: 'text-critical',
    'critical-bolder': 'text-critical-bolder',
    warning: 'text-warning',
    'warning-bolder': 'text-warning-bolder',
    success: 'text-success',
    'success-bolder': 'text-success-bolder'
};
const lineClampMap = {
    1: 'line-clamp-1',
    2: 'line-clamp-2',
    3: 'line-clamp-3',
    4: 'line-clamp-4',
    5: 'line-clamp-5',
    6: 'line-clamp-6'
};
const displayVariants = (0, class_variance_authority_1.cva)('font-semibold', {
    variants: {
        size: {
            '2xl': 'text-7xl',
            xl: 'text-5xl',
            lg: 'text-3xl',
            md: 'text-2xl',
            sm: 'text-xl',
            xs: 'text-lg'
        },
        color: colorMap,
        lineClamp: lineClampMap
    },
    defaultVariants: {
        size: 'lg',
        color: 'default'
    }
});
const headingVariants = (0, class_variance_authority_1.cva)('font-medium', {
    variants: {
        size: {
            h1: 'text-2xl',
            h2: 'text-xl',
            h3: 'text-lg',
            h4: 'text-base',
            h5: 'text-sm'
        },
        color: colorMap,
        lineClamp: lineClampMap
    },
    defaultVariants: {
        size: 'h1',
        color: 'default'
    }
});
const subHeadingVariants = (0, class_variance_authority_1.cva)('text-default', {
    variants: {
        size: {
            sm: 'text-xs',
            lg: 'text-sm'
        },
        color: colorMap,
        lineClamp: lineClampMap
    },
    defaultVariants: {
        size: 'lg',
        color: 'default'
    }
});
const textVariants = (0, class_variance_authority_1.cva)('', {
    variants: {
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            lg: 'text-base'
        },
        weight: {
            regular: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold'
        },
        color: colorMap,
        lineClamp: lineClampMap
    },
    defaultVariants: {
        size: 'lg',
        weight: 'regular',
        color: 'default'
    }
});
const descriptionVariants = (0, class_variance_authority_1.cva)('', {
    variants: {
        size: {
            lg: 'text-xs',
            sm: 'text-2xs'
        },
        weight: {
            regular: 'font-normal',
            medium: 'font-medium'
        },
        color: colorMap,
        lineClamp: lineClampMap
    },
    defaultVariants: {
        size: 'lg',
        weight: 'regular',
        color: 'subtler'
    }
});
const HComponentMap = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6'
};
const TextComponentMap = {
    p: 'p',
    blockquote: 'blockquote',
    span: 'span',
    code: 'code',
    bold: 'b',
    italic: 'i',
    strikethrough: 's',
    underline: 'u'
};
const renderBlock = ({ underline = false, strikethrough = false, strong = false, italic = false }, defaultValue = 'p') => {
    const underlineValue = underline && 'underline';
    const strikethroughValue = strikethrough && 'strikethrough';
    const strongValue = strong && 'bold';
    const italicValue = italic && 'italic';
    return TextComponentMap[underlineValue || strikethroughValue || strongValue || italicValue || defaultValue];
};
const dangerouText = (text) => {
    return (0, isomorphic_dompurify_1.sanitize)(`${text}`, {
        ADD_ATTR: ['target'],
        FORBID_TAGS: ['style', 'form', 'input', 'checkbox', 'svg'],
        FORBID_ATTR: ['action']
    });
};
exports.Heading = React.forwardRef((props, ref) => {
    const { className, size, color, lineClamp, children, dangerous, ...passProps } = props;
    const Comp = HComponentMap[size || 'h1'];
    const text = dangerous && dangerouText(`${children}`);
    return ((0, jsx_runtime_1.jsx)(Comp, { ref: ref, className: (0, utils_1.cn)(headingVariants({ size, color, lineClamp }), className), ...passProps, ...(dangerous && { dangerouslySetInnerHTML: { __html: `${text}` } }), children: !dangerous ? children : null }));
});
exports.Display = React.forwardRef((props, ref) => {
    const { className, size, lineClamp, underline, strikethrough, strong, italic, children, dangerous, ...passProps } = props;
    const Comp = renderBlock({
        underline,
        strikethrough,
        strong,
        italic
    }, 'span');
    const text = dangerous && dangerouText(`${children}`);
    return ((0, jsx_runtime_1.jsx)(Comp, { ref: ref, className: (0, utils_1.cn)(displayVariants({ size, lineClamp }), className), ...(0, lodash_es_1.omit)(passProps, 'lineClamp'), ...(dangerous && { dangerouslySetInnerHTML: { __html: `${text}` } }), children: !dangerous ? children : null }));
});
exports.Title = exports.Heading;
exports.SubHeading = React.forwardRef((props, ref) => {
    const { className, size, children, lineClamp, ...passProps } = props;
    return ((0, jsx_runtime_1.jsx)("p", { ref: ref, className: (0, utils_1.cn)(subHeadingVariants({ size, lineClamp }), className), ...passProps, children: children }));
});
exports.SubTitle = exports.SubHeading;
exports.Text = React.forwardRef((props, ref) => {
    const { className, size, weight, color, lineClamp, underline, strikethrough, strong, italic, children, dangerous, ...passProps } = props;
    const Comp = renderBlock({
        underline,
        strikethrough,
        strong,
        italic
    }, 'span');
    const text = dangerous && dangerouText(`${children}`);
    return ((0, jsx_runtime_1.jsx)(Comp, { ref: ref, className: (0, utils_1.cn)(textVariants({ size, weight, color, lineClamp }), className), ...(0, lodash_es_1.omit)(passProps, 'lineClamp'), ...(dangerous && { dangerouslySetInnerHTML: { __html: `${text}` } }), children: !dangerous ? children : null }));
});
exports.Paragraph = React.forwardRef((props, ref) => {
    const { className, size, weight, color, lineClamp, underline, strikethrough, strong, italic, children, dangerous, ...passProps } = props;
    const Comp = renderBlock({
        underline,
        strikethrough,
        strong,
        italic
    }, 'p');
    const text = dangerous && dangerouText(`${children}`);
    return ((0, jsx_runtime_1.jsx)(Comp, { ref: ref, className: (0, utils_1.cn)(textVariants({ size, weight, color, lineClamp }), className), ...passProps, ...(dangerous && { dangerouslySetInnerHTML: { __html: `${text}` } }), children: !dangerous ? children : null }));
});
exports.Description = React.forwardRef((props, ref) => {
    const { className, size, weight, color, lineClamp, underline, strikethrough, strong, italic, children, dangerous, ...passProps } = props;
    const Comp = renderBlock({
        underline,
        strikethrough,
        strong,
        italic
    }, 'span');
    const text = dangerous && dangerouText(`${children}`);
    return ((0, jsx_runtime_1.jsx)(Comp, { ref: ref, className: (0, utils_1.cn)(descriptionVariants({ size, weight, color, lineClamp }), className), ...(0, lodash_es_1.omit)(passProps, 'lineClamp'), ...(dangerous && { dangerouslySetInnerHTML: { __html: `${text}` } }), children: !dangerous ? children : null }));
});
