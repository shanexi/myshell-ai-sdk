"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const utils_1 = require("../../../../lib/utils.js");
require("./index.css");
const Marquee = (0, react_1.forwardRef)(function Marquee({ style = {}, className = '', autoFill = false, play = true, pauseOnHover = false, direction = 'left', speed = 50, delay = 0, loop = 0, onFinish, onCycleComplete, children }, ref) {
    const [containerWidth, setContainerWidth] = (0, react_1.useState)(0);
    const [marqueeWidth, setMarqueeWidth] = (0, react_1.useState)(0);
    const [multiplier, setMultiplier] = (0, react_1.useState)(1);
    const [isMounted, setIsMounted] = (0, react_1.useState)(false);
    const rootRef = (0, react_1.useRef)(null);
    const containerRef = ref || rootRef;
    const marqueeRef = (0, react_1.useRef)(null);
    const calculateWidth = (0, react_1.useCallback)(() => {
        if (marqueeRef.current && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const marqueeRect = marqueeRef.current.getBoundingClientRect();
            let containerWidth = containerRect.width;
            let marqueeWidth = marqueeRect.width;
            if (direction === 'up' || direction === 'down') {
                containerWidth = containerRect.height;
                marqueeWidth = marqueeRect.height;
            }
            if (autoFill && containerWidth && marqueeWidth) {
                setMultiplier(marqueeWidth < containerWidth ? Math.ceil(containerWidth / marqueeWidth) : 1);
            }
            else {
                setMultiplier(1);
            }
            setContainerWidth(containerWidth);
            setMarqueeWidth(marqueeWidth);
        }
    }, [autoFill, containerRef, direction]);
    (0, react_1.useEffect)(() => {
        if (!isMounted)
            return;
        calculateWidth();
        if (marqueeRef.current && containerRef.current) {
            const resizeObserver = new ResizeObserver(() => calculateWidth());
            resizeObserver.observe(containerRef.current);
            resizeObserver.observe(marqueeRef.current);
            return () => {
                if (!resizeObserver)
                    return;
                resizeObserver.disconnect();
            };
        }
    }, [calculateWidth, containerRef, isMounted]);
    (0, react_1.useEffect)(() => {
        calculateWidth();
    }, [calculateWidth, children]);
    (0, react_1.useEffect)(() => {
        setIsMounted(true);
    }, []);
    const duration = (0, react_1.useMemo)(() => {
        if (autoFill) {
            return (marqueeWidth * multiplier) / speed;
        }
        else {
            return marqueeWidth < containerWidth ? containerWidth / speed : marqueeWidth / speed;
        }
    }, [autoFill, containerWidth, marqueeWidth, multiplier, speed]);
    const containerStyle = (0, react_1.useMemo)(() => ({
        ...style,
        width: direction === 'up' || direction === 'down' ? `100vh` : '100%',
        transform: direction === 'up' ? 'rotate(-90deg)' : direction === 'down' ? 'rotate(90deg)' : 'none'
    }), [style, play, pauseOnHover, direction]);
    const marqueeStyle = (0, react_1.useMemo)(() => ({
        flex: '0 0 auto',
        animationDuration: `${duration}s`,
        animationDirection: direction === 'left' ? 'normal' : 'reverse',
        animationDelay: `${delay}s`,
        animation: !!loop
            ? `scroll ${duration}s linear ${delay}s ${loop}`
            : `scroll ${duration}s linear ${delay}s infinite`,
        minWidth: autoFill ? `auto` : '100%'
    }), [play, direction, duration, delay, loop, autoFill]);
    const childStyle = (0, react_1.useMemo)(() => ({
        transform: direction === 'up' ? 'rotate(90deg)' : direction === 'down' ? 'rotate(-90deg)' : 'none'
    }), [direction]);
    const multiplyChildren = (0, react_1.useCallback)((multiplier) => {
        return [...Array(Number.isFinite(multiplier) && multiplier >= 0 ? multiplier : 0)].map((_, i) => ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: react_1.Children.map(children, child => {
                return ((0, jsx_runtime_1.jsx)("div", { style: childStyle, className: "ms-child", children: child }, `children${i}`));
            }) }, i)));
    }, [childStyle, children]);
    return !isMounted ? null : ((0, jsx_runtime_1.jsxs)("div", { ref: containerRef, style: containerStyle, className: (0, utils_1.cn)(`ms-marquee-container overflow-x-hidden flex flex-row relative${className}`, !play || pauseOnHover ? 'ms-marquee-pause-hover' : ''), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)(' z-[1] flex flex-row items-center'), style: marqueeStyle, onAnimationIteration: onCycleComplete, onAnimationEnd: onFinish, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-row items-center min-w-[auto]", ref: marqueeRef, children: react_1.Children.map(children, child => {
                            return ((0, jsx_runtime_1.jsx)("div", { style: childStyle, className: "ms-child", children: child }));
                        }) }), multiplyChildren(multiplier - 1)] }), (0, jsx_runtime_1.jsx)("div", { style: marqueeStyle, children: multiplyChildren(multiplier) })] }));
});
exports.default = Marquee;
