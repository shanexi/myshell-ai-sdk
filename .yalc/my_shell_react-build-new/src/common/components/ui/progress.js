"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../../lib/utils.js");
const typography_1 = require("../../../common/components/ui/typography.js");
const react_1 = require("react");
const ProgressBar = ({ progress, steps = [1], showInfo, label, tips, className, wrapperClassName }) => {
    const progressList = (0, react_1.useMemo)(() => {
        let list = new Array(steps.length).fill(0);
        let remainingProgress = progress / 100;
        for (let i = 0; i < steps.length; i++) {
            if (remainingProgress <= steps[i]) {
                list[i] = remainingProgress / steps[i];
                break;
            }
            else {
                list[i] = 1;
                remainingProgress -= steps[i];
            }
        }
        return list;
    }, [steps, progress]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'w-full', children: [showInfo ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between mb-2", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", children: label }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-x-1 items-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", children: `${progress}%` }), tips] })] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex gap-x-1", children: steps?.map((step, idx) => {
                    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)(`h-3 relative w-[${step * 100}%]`, wrapperClassName), children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 bottom-0 left-0 w-full h-full bg-gray-200 rounded-full" }), (0, jsx_runtime_1.jsx)("div", { style: {
                                    width: `${progressList[idx] * 100}%`
                                }, className: (0, utils_1.cn)('absolute top-0 bottom-0 left-0 h-full transition-all duration-150 bg-pink-button rounded-full', className) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 bottom-0 left-0 flex items-center justify-center w-full h-full" })] }, step + idx));
                }) })] }));
};
exports.default = ProgressBar;
