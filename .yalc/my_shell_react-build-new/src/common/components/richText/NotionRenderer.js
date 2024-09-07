"use strict";
'use client';
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionRenderer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const rich_text_react_renderer_1 = require("@contentful/rich-text-react-renderer");
const richTextTypes = __importStar(require("@contentful/rich-text-types"));
const lodash_es_1 = require("lodash-es");
const CodeBlock_1 = require("../../../common/components/richText/CodeBlock.js");
const formatter_1 = require("../../../common/components/richText/formatter.js");
const typography_1 = require("../../../common/components/ui/typography.js");
const Image_1 = __importDefault(require("../../../components/explore/Image.js"));
const codeRenderer = (node, children) => {
    const data = node.data;
    return (0, jsx_runtime_1.jsx)(CodeBlock_1.CodeBlock, { code: data.properties.title[0][0], language: data.properties.language[0][0], className: "py-3" });
};
const imageRenderer = (node, children) => {
    const data = node.data;
    console.log('data image render', node);
    return (0, jsx_runtime_1.jsx)(Image_1.default, { src: data.src, alt: data.alt, className: "min-h-[200px]" });
};
const defaultOptions = {
    renderNode: {
        [richTextTypes.BLOCKS.HEADING_1]: (node, children) => ((0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h1", className: "mt-2", children: children })),
        [richTextTypes.BLOCKS.HEADING_2]: (node, children) => ((0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", className: "pt-6", children: children })),
        [richTextTypes.BLOCKS.HEADING_3]: (node, children) => ((0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h3", className: "pt-6", children: children })),
        [richTextTypes.BLOCKS.HEADING_4]: (node, children) => ((0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h4", className: "pt-6", children: children })),
        [richTextTypes.BLOCKS.PARAGRAPH]: (node, children) => ((0, jsx_runtime_1.jsx)(typography_1.SubHeading, { size: "lg", color: "subtle", children: children })),
        [richTextTypes.BLOCKS.UL_LIST]: (node, children) => ((0, jsx_runtime_1.jsx)("ul", { className: "list-disc pl-5 space-y-3 text-base", children: children })),
        [richTextTypes.BLOCKS.OL_LIST]: (node, children) => ((0, jsx_runtime_1.jsx)("ol", { className: "list-decimal pl-5 space-y-3 text-base", children: children })),
        [richTextTypes.INLINES.HYPERLINK]: (node, children) => ((0, jsx_runtime_1.jsx)("a", { href: node.data.uri, target: "_blank", rel: "noopener noreferrer", className: "text-surface-primary-default no-underline hover:underline", children: children }))
    },
    renderMark: {
        [richTextTypes.MARKS.CODE]: text => ((0, jsx_runtime_1.jsx)("span", { className: "text-base px-1.5 h-[24px] inline-block bg-surface-accent-gray-subtler text-critical rounded-[4px]", children: text }))
    },
    renderEntity: {
        code: codeRenderer
    },
    renderAsset: {
        image: imageRenderer
    }
};
const NotionRenderer = ({ recordMap, options, className }) => {
    let mergedOptions = (0, lodash_es_1.merge)(defaultOptions, options, className, {});
    mergedOptions = (0, lodash_es_1.merge)(mergedOptions, {
        renderNode: {
            [richTextTypes.BLOCKS.EMBEDDED_ENTRY]: (node, children) => mergedOptions.renderEntity?.[node.data.type]?.(node, children) ?? children,
            [richTextTypes.BLOCKS.EMBEDDED_ASSET]: (node, children) => mergedOptions.renderAsset?.[node.data.type]?.(node, children) ?? children
        }
    });
    const document = (0, formatter_1.notionToRichText)(recordMap);
    const Component = (0, rich_text_react_renderer_1.documentToReactComponents)(document, mergedOptions);
    return (0, jsx_runtime_1.jsx)("div", { className: className, children: Component });
};
exports.NotionRenderer = NotionRenderer;
