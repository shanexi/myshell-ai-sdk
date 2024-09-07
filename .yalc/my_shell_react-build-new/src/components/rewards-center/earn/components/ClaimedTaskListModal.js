"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClaimedTaskListModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const modal_1 = require("../../../../common/components/ui/modal.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const shell_point_1 = require("../../components/shell-point/index.js");
function ClaimedTaskListModal({ claimedTasks, onClose }) {
    const t = (0, next_intl_1.useTranslations)('reward_center.earn_content');
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: true, title: t('claimed_records'), onClose: onClose, size: "md", children: (0, jsx_runtime_1.jsx)(modal_1.ModalBody, { className: "h-[454px] px-4 overflow-y-auto", children: claimedTasks.length ? ((0, jsx_runtime_1.jsx)("ul", { className: "space-y-3", children: claimedTasks.map(task => ((0, jsx_runtime_1.jsx)("li", { className: "list-none w-full p-3 rounded-xl border border-default", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grow flex flex-col overflow-hidden space-y-1.5", children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0 flex items-center w-10 h-10 rounded-xl", children: (0, jsx_runtime_1.jsx)("img", { width: 40, height: 40, alt: `task-${task.taskType}`, src: isDark ? task.taskIconDark : task.taskIconLight, className: "w-10 h-10" }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", children: task.taskName })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex shrink-0 ml-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-center", children: [(0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { type: task.pointType, size: 22 }), (0, jsx_runtime_1.jsx)("div", { className: "text-base md:text-xs text-brand font-medium text-center", children: (0, common_helper_1.formatFloatNumberToOneDecimalAndRemoveDecimalZero)(task.claimedGemCount ?? 0) })] }) })] }) }, `${task.id}-${task.status}`))) })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", children: t('no_claimed_records') }) })) }) }));
}
