"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const common_helper_1 = require("../../common/utils/common-helper.js");
const components = ({ dataKey, props }) => {
    return {
        banner: {
            jsx: ((0, jsx_runtime_1.jsx)("div", { ...props, id: `banner-${dataKey}`, children: "aaaa" })),
            fullWidth: true,
            noPadding: true
        }
    };
};
const Component = ({ dataKey, props }) => {
    if (!dataKey)
        return null;
    const component = components({ dataKey, props })[dataKey];
    if (!component?.jsx || (0, common_helper_1.isObjEmpty)(props?.data)) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { id: dataKey, className: props?.className, children: component?.jsx }, dataKey));
};
exports.default = Component;
