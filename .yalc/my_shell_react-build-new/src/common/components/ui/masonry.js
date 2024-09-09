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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = __importStar(require("react"));
const utils_1 = require("../../../lib/utils.js");
const Masonry = ({ breakpointCols = {
    default: 0,
    3280: 5,
    1919: 4,
    1439: 3,
    1199: 2
}, className = '', columnClassName = '', children, columnAttrs = {} }) => {
    const [columnCount, setColumnCount] = (0, react_2.useState)(typeof breakpointCols === 'number' ? breakpointCols : breakpointCols.default);
    const reCalculateColumnCount = () => {
        const windowWidth = window?.innerWidth || Infinity;
        let newColumnCount = columnCount;
        if (typeof breakpointCols === 'object') {
            let matchedBreakpoint = Infinity;
            for (const breakpoint in breakpointCols) {
                const optBreakpoint = parseInt(breakpoint);
                const isCurrentBreakpoint = optBreakpoint > 0 && windowWidth <= optBreakpoint;
                if (isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
                    matchedBreakpoint = optBreakpoint;
                    newColumnCount = breakpointCols[breakpoint];
                }
            }
            newColumnCount = Math.max(1, newColumnCount || 1);
        }
        if (columnCount !== newColumnCount) {
            setColumnCount(newColumnCount);
        }
    };
    (0, react_2.useEffect)(() => {
        const handleResize = () => {
            reCalculateColumnCount();
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpointCols, columnCount]);
    const itemsInColumns = () => {
        const columns = new Array(columnCount);
        const items = react_2.default.Children.toArray(children);
        for (let i = 0; i < items.length; i++) {
            const columnIndex = i % columnCount;
            if (!columns[columnIndex]) {
                columns[columnIndex] = [];
            }
            columns[columnIndex].push(items[i]);
        }
        return columns;
    };
    const renderColumns = () => {
        const childrenInColumns = itemsInColumns();
        const columnWidth = `${100 / childrenInColumns.length}%`;
        return childrenInColumns.map((items, i) => ((0, react_1.createElement)("div", { ...columnAttrs, style: { ...columnAttrs.style, width: columnWidth }, className: (0, utils_1.cn)('pl-2 md:pl-5 bg-clip-padding space-y-2 md:space-y-5', columnClassName), key: i }, items)));
    };
    return ((0, jsx_runtime_1.jsx)("div", { ...columnAttrs, className: (0, utils_1.cn)('flex mr-4 md:mr-6 w-auto', className || 'my-masonry-grid'), children: columnCount > 0 && renderColumns() }));
};
exports.default = Masonry;
