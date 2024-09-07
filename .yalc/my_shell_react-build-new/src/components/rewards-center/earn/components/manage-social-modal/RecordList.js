"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RecordList;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_intl_1 = require("use-intl");
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/solid/CheckIcon"));
const ArrowUturnLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowUturnLeftIcon"));
const task_1 = require("../../../../../apis/task.js");
const task_2 = require("../../../../../apis/task.js");
const utils_1 = require("../../../../../lib/utils.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const dayjs_1 = __importDefault(require("dayjs"));
const button_1 = require("../../../../../common/components/ui/button.js");
const shell_point_1 = require("../../../../../components/rewards-center/components/shell-point/index.js");
const task_3 = require("../../../../../common/constants/enums/task.js");
const react_use_1 = require("react-use");
const x_2x_png_1 = __importDefault(require("./assets/images/x@2x.png"));
const myshell_2x_png_1 = __importDefault(require("./assets/images/myshell@2x.png"));
const react_1 = require("react");
const ClaimButton = ({ record, onClaimed }) => {
    const t = (0, use_intl_1.useTranslations)('reward_center.earn_content');
    const [state, onClaim] = (0, react_use_1.useAsyncFn)(async (id) => {
        const { success } = await (0, task_1.claimTaskByRecordId)(id);
        if (success) {
            onClaimed && onClaimed();
        }
    });
    return ((0, jsx_runtime_1.jsx)("div", { className: "shrink-0 w-[110px] md:w-[126px]", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", icon: CheckIcon_1.default, onClick: () => onClaim(record.recordId), loading: state.loading, isBlock: true, children: t('claim') }) }));
};
const VerifyingButton = ({ record, onCancel }) => {
    const t = (0, use_intl_1.useTranslations)('reward_center.earn_content');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const onClick = async () => {
        setLoading(true);
        const { success } = await (0, task_2.cancelVerifyMediaShareRecord)(record.id);
        if (success) {
            onCancel && onCancel(record.id);
        }
        setLoading(false);
    };
    return ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "plain", icon: ArrowUturnLeftIcon_1.default, color: "gray", size: "sm", onClick: onClick, loading: loading, className: "text-xs", iconClassName: "w-3 h-3", children: t('manage_social_media.cancel') }));
};
function RecordList({ records, isClaimed, onClaimed, onCancel }) {
    const t = (0, use_intl_1.useTranslations)('reward_center.earn_content');
    const [canceledIds, setCanceledIds] = (0, react_1.useState)([]);
    const onVerifyingCancel = (id) => {
        setCanceledIds(v => [...v, id]);
        onCancel && onCancel();
    };
    const renderStatus = (record) => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 flex-col items-center justify-center", children: [record.status === 'MEDIA_SHARE_STATUS_VERIFYING' && !canceledIds.includes(record.id) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center space-y-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center h-5.5 px-3.5 bg-surface-accent-gray-subtlest rounded-full", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", children: t('manage_social_media.verifying') }) }), (0, jsx_runtime_1.jsx)(VerifyingButton, { record: record, onCancel: onVerifyingCancel })] })) : null, (record.status === 'MEDIA_SHARE_STATUS_UNVERIFIED') || canceledIds.includes(record.id) ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center h-5.5 px-3.5 bg-surface-accent-yellow-subtle rounded-full", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", className: "text-warning-bolder", children: t('manage_social_media.unverified') }) })) : null, record.status === 'MEDIA_SHARE_STATUS_REJECTED' ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center h-5.5 px-3.5 bg-surface-accent-yellow-subtle rounded-full", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", className: "text-warning-bolder", children: t('manage_social_media.rejected') }) })) : null, record.status === 'MEDIA_SHARE_STATUS_VERIFIED' ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex md:flex-col justify-center items-center hidden md:flex", children: [(0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { size: 36, type: task_3.PointTypeEnum.USER_POINT_TYPE_ADVOCATOR }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-brand", children: ["+", record.pointsText] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex md:flex-col justify-center items-center md:hidden", children: [(0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { size: 22, type: task_3.PointTypeEnum.USER_POINT_TYPE_ADVOCATOR }), (0, jsx_runtime_1.jsxs)("div", { className: "text-base text-brand", children: ["+", record.pointsText] })] })] })) : null, record.status === 'MEDIA_SHARE_STATUS_CLAIMED' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-xs text-brand", children: "+" }), (0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { size: 22, type: task_3.PointTypeEnum.USER_POINT_TYPE_ADVOCATOR }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-brand", children: record.pointsText })] })) : null] }));
    };
    if (isClaimed) {
        return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex flex-col space-y-3'), children: records?.map((record) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex flex-col md:flex-row items-start md:items-center justify-between p-3 border-default border md:space-x-3 rounded-xl'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "grow flex flex-col space-y-1 md:space-y-1.5 overflow-hidden", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", size: "lg", children: (0, dayjs_1.default)(Number(record.createdAtUnix)).format('YYYY/MM/DD HH:mm:ss') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-1.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: 'grow-0 max-w-[50%] overflow-hidden flex items-center px-1.5 py-1 rounded-md bg-surface-accent-gray-subtlest', children: [(0, jsx_runtime_1.jsx)("img", { className: "w-5 h-5 rounded-sm mr-1.5", src: x_2x_png_1.default.src }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", className: "line-clamp-1 flex-1", children: record.postContent })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'grow-0 max-w-[50%] overflow-hidden flex items-center px-1.5 py-1 rounded-md bg-surface-accent-gray-subtlest', children: [(0, jsx_runtime_1.jsx)("img", { className: "w-5 h-5 rounded-sm mr-1.5", src: myshell_2x_png_1.default.src }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", className: "line-clamp-1 flex-1", children: record.shareContent })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "border-b border-default w-full my-2.5 md:hidden" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end items-center w-full md:w-auto space-x-1.5 md:space-x-3", children: [renderStatus(record), (0, jsx_runtime_1.jsx)(ClaimButton, { record: record, onClaimed: onClaimed })] })] }, record.recordId))) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex flex-col'), children: records?.filter(record => record.id !== '10').map((record, i) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex items-center justify-between py-4 border-default space-x-3', (i !== records.length - 1) && 'border-b'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "grow flex flex-col space-y-1.5 overflow-hidden", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", size: "lg", children: (0, dayjs_1.default)(Number(record.createdAtUnix)).format('YYYY/MM/DD HH:mm:ss') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-1.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: 'grow-0 max-w-[50%] overflow-hidden flex items-center px-1.5 py-1 rounded-md bg-surface-accent-gray-subtlest', children: [(0, jsx_runtime_1.jsx)("img", { className: "w-5 h-5 rounded-sm mr-1.5", src: x_2x_png_1.default.src }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", className: "line-clamp-1 flex-1", children: record.postContent })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'grow-0 max-w-[50%] overflow-hidden flex items-center px-1.5 py-1 rounded-md bg-surface-accent-gray-subtlest', children: [(0, jsx_runtime_1.jsx)("img", { className: "w-5 h-5 rounded-sm mr-1.5", src: myshell_2x_png_1.default.src }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", className: "line-clamp-1 flex-1", children: record.shareContent })] })] })] }), renderStatus(record)] }, record.recordId))) }));
}
