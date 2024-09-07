"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BadgeName;
const jsx_runtime_1 = require("react/jsx-runtime");
const input_1 = require("../../../../../common/components/ui/input.js");
function BadgeName(props) {
    const { ticker = '', onTickerChange, helpText, loading } = props;
    const onChange = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z]+$/;
        if (!regex.test(value) && value.length > 0) {
            return;
        }
        onTickerChange?.(value);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col py-3 px-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center border border-default rounded-xl h-11 py-2 px-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base text-default", children: "$" }), (0, jsx_runtime_1.jsx)(input_1.Input, { value: ticker, onChange: onChange, className: "text-base pl-2", border: "none", outline: "none", shadow: "none", placeholder: "AGENT", background: "none", maxLength: 10, disabled: loading }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-subtlest", children: [ticker.length, "/9"] })] }), !!helpText && (0, jsx_runtime_1.jsx)("p", { className: "text-sm mt-1 text-critical", children: helpText })] }));
}
