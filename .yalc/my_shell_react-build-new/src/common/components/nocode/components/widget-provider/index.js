"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetProvider = exports.useWidgetContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const WidgetContext = (0, react_1.createContext)({});
const useWidgetContext = () => {
    return (0, react_1.useContext)(WidgetContext);
};
exports.useWidgetContext = useWidgetContext;
const WidgetProvider = props => {
    const { children, widgets } = props;
    return ((0, jsx_runtime_1.jsx)(WidgetContext.Provider, { value: { widgets }, children: children }));
};
exports.WidgetProvider = WidgetProvider;
