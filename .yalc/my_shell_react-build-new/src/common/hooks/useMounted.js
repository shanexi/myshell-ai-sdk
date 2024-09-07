"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMounted = void 0;
const react_1 = require("react");
const useMounted = () => {
    const [mounted, setMounted] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setMounted(true);
    }, []);
    return {
        mounted
    };
};
exports.useMounted = useMounted;
