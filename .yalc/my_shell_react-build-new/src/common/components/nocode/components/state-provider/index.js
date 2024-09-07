"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateProvider = exports.useStore = exports.useStateContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const uuid_1 = require("uuid");
const zustand_1 = require("zustand");
Object.defineProperty(exports, "useStore", { enumerable: true, get: function () { return zustand_1.useStore; } });
const store = (0, zustand_1.create)(set => ({
    jsonMode: false,
    setJsonMode: jsonMode => set(() => {
        return {
            jsonMode
        };
    }),
    key: (0, uuid_1.v4)(),
    setKey: () => set(() => {
        return {
            key: (0, uuid_1.v4)()
        };
    })
}));
const StateContext = (0, react_1.createContext)(store);
const useStateContext = () => {
    return (0, react_1.useContext)(StateContext);
};
exports.useStateContext = useStateContext;
const StateProvider = ({ children }) => {
    return (0, jsx_runtime_1.jsx)(StateContext.Provider, { value: store, children: children });
};
exports.StateProvider = StateProvider;
