"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ManageSocialModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_intl_1 = require("use-intl");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const RecordList_1 = __importDefault(require("./RecordList.js"));
const task_1 = require("../../../../../apis/task.js");
const react_1 = require("react");
const Skeleton_1 = __importDefault(require("./Skeleton.js"));
const store_1 = require("../../../../../services/store/index.js");
const task_2 = require("../../../../../common/constants/enums/task.js");
function ManageSocialModal({ isOpen, onClose }) {
    const t = (0, use_intl_1.useTranslations)('reward_center.earn_content.manage_social_media');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [records, setRecords] = (0, react_1.useState)([]);
    const taskList = (0, store_1.useTaskStore)(state => state.taskList);
    const setTaskList = (0, store_1.useTaskStore)(state => state.setTaskList);
    const setVerifyingCount = () => {
        setTaskList(taskList.map((task) => {
            if (task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE && task.taskInfo) {
                const verifyingCount = task.taskInfo?.verifyingMediaShareRecordsCount || 0;
                return {
                    ...task,
                    taskInfo: {
                        ...task.taskInfo,
                        verifyingMediaShareRecordsCount: verifyingCount - 1
                    }
                };
            }
            return task;
        }));
    };
    const queryMediaShareRecord = async () => {
        if (loading) {
            return;
        }
        try {
            setLoading(true);
            const { success, data } = await (0, task_1.getMediaShareReocrd)();
            if (success) {
                setRecords(data);
            }
        }
        catch (e) {
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        queryMediaShareRecord();
    }, []);
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, onClose: onClose, title: t('manage_submissions'), modalOnly: false, children: (0, jsx_runtime_1.jsx)(modal_1.ModalBody, { className: "px-4 py-1 h-[570px] overflow-auto", children: loading ? ((0, jsx_runtime_1.jsx)(Skeleton_1.default, {})) : ((0, jsx_runtime_1.jsx)(RecordList_1.default, { records: records, onCancel: setVerifyingCount })) }) }));
}
