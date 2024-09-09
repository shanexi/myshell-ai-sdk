"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetProps;
const task_1 = require("../../apis/task");
const store_1 = require("../../services/store");
function useGetProps() {
    const setMyProps = (0, store_1.useTaskStore)(state => state.setMyProps);
    const myProps = (0, store_1.useTaskStore)(state => state.myProps);
    const querying = (0, store_1.useTaskStore)(state => state.myPropsQuerying);
    const setMyPropsQuerying = (0, store_1.useTaskStore)(state => state.setMyPropsQuerying);
    const queryProps = async () => {
        try {
            setMyPropsQuerying(true);
            const { data } = await (0, task_1.getProps)();
            setMyProps(data ?? []);
        }
        catch (e) {
        }
        finally {
            setMyPropsQuerying(false);
        }
    };
    return { querying, queryProps, myProps };
}
