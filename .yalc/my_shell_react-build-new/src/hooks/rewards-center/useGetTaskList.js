"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetTaskList;
const react_1 = require("react");
const task_1 = require("../../apis/task.js");
const store_1 = require("../../services/store/index.js");
function useGetTaskList() {
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const setNewlyPropsCount = (0, store_1.useTaskStore)(state => state.setNewlyPropsCount);
    const setTaskList = (0, store_1.useTaskStore)(state => state.setTaskList);
    const fetchTaskList = (0, react_1.useCallback)(async () => {
        if (isVisitor & 2) {
            try {
                const { data } = await (0, task_1.getTaskList)();
                setTaskList(data);
            }
            catch (e) {
            }
            (0, task_1.getNewlyMyPropsCount)().subscribe({
                next: num => {
                    setNewlyPropsCount(num);
                }
            });
        }
    }, [isVisitor, setTaskList, setNewlyPropsCount]);
    (0, react_1.useEffect)(() => {
        fetchTaskList();
        const interval = setInterval(fetchTaskList, 1000 * 60 * 5);
        return () => {
            clearInterval(interval);
        };
    }, [fetchTaskList]);
}
