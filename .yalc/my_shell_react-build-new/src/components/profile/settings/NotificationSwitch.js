"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotificationSwitch;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner.js"));
const switch_1 = require("../../../common/components/ui/switch.js");
const useUserSettings_1 = __importDefault(require("../../../common/hooks/useUserSettings.js"));
const store_1 = require("../../../services/store/index.js");
function NotificationSwitch() {
    const t = (0, next_intl_1.useTranslations)('profile');
    const [loading, setLoading] = (0, react_use_1.useToggle)(false);
    const receiveNotification = (0, store_1.useUserStore)(state => state.notification);
    const { handleReceiveNotification } = (0, useUserSettings_1.default)();
    const handleClick = (0, react_1.useCallback)(async () => {
        try {
            setLoading(true);
            await handleReceiveNotification(!receiveNotification, () => {
                setLoading(false);
            });
        }
        catch (e) {
            setLoading(false);
        }
    }, [handleReceiveNotification, receiveNotification, setLoading]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full md:w-[450px] border border-default rounded-xl h-11 px-3 flex justify-between items-center shadow-background-default bg-surface-search-field", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-1", children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-default", children: t('message_notification') }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [loading && (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "xs", color: "brand" }), (0, jsx_runtime_1.jsx)(switch_1.Switch, { checked: receiveNotification, onClick: handleClick })] })] }));
}
