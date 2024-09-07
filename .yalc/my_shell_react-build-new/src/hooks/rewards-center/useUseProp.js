"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useUseProp;
const react_1 = require("react");
const task_1 = require("../../apis/task.js");
const useGetProps_1 = __importDefault(require("./useGetProps.js"));
function useUseProp() {
    const [acting, setActing] = (0, react_1.useState)(false);
    const { queryProps } = (0, useGetProps_1.default)();
    const handleUseProp = (0, react_1.useCallback)(async (propId, prop, count, successCb) => {
        try {
            setActing(true);
            await (0, task_1.onUseProp)(propId, count);
            successCb && successCb();
            queryProps();
        }
        catch (e) {
        }
        finally {
            setActing(false);
        }
    }, [queryProps]);
    return {
        acting,
        handleUseProp
    };
}
