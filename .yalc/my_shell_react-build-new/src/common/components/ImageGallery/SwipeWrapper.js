"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_swipeable_1 = require("react-swipeable");
const defaultProps = {
    className: '',
    delta: 0,
    onSwiping: () => { },
    onSwiped: () => { }
};
const SwipeWrapper = (props) => {
    const { children, className, delta, onSwiping, onSwiped } = {
        ...defaultProps,
        ...props
    };
    const swipeHandlers = (0, react_swipeable_1.useSwipeable)({
        delta,
        onSwiping,
        onSwiped
    });
    return ((0, jsx_runtime_1.jsx)("div", { ...swipeHandlers, className: className, children: children }));
};
exports.default = SwipeWrapper;
