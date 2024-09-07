"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChatHistory = useChatHistory;
const react_1 = require("react");
function useChatHistory(initialArray = []) {
    const [list, setList] = (0, react_1.useState)(initialArray);
    const append = (item) => {
        setList(prevList => {
            const newList = JSON.parse(JSON.stringify(prevList));
            if (newList.length > 0 && newList[newList.length - 1].role === item.role) {
                newList[newList.length - 1].content += ` ${item.content}`;
            }
            else {
                newList.push(item);
            }
            return newList;
        });
    };
    const clear = () => {
        setList([]);
    };
    return [list, append, clear];
}
