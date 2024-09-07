"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ChatStaticContext = (0, react_1.createContext)({
    entityType: 'bot',
    id: ''
});
exports.default = ChatStaticContext;
