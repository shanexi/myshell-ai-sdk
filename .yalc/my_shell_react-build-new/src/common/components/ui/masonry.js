'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import React, { useState, useEffect } from 'react';
import { cn } from '../../../lib/utils.js';
const Masonry = ({ breakpointCols = {
    default: 0,
    3280: 5,
    1919: 4,
    1439: 3,
    1199: 2
}, className = '', columnClassName = '', children, columnAttrs = {} }) => {
    const [columnCount, setColumnCount] = useState(typeof breakpointCols === 'number' ? breakpointCols : breakpointCols.default);
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
    useEffect(() => {
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
        const items = React.Children.toArray(children);
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
        return childrenInColumns.map((items, i) => (_createElement("div", { ...columnAttrs, style: { ...columnAttrs.style, width: columnWidth }, className: cn('pl-2 md:pl-5 bg-clip-padding space-y-2 md:space-y-5', columnClassName), key: i }, items)));
    };
    return (_jsx("div", { ...columnAttrs, className: cn('flex mr-4 md:mr-6 w-auto', className || 'my-masonry-grid'), children: columnCount > 0 && renderColumns() }));
};
export default Masonry;
