"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AutoUpdateTimezone;
const react_1 = require("react");
const user_1 = require("../../../../common/constants/enums/user.js");
const useUserSettings_1 = __importDefault(require("../../../../common/hooks/useUserSettings.js"));
const store_1 = require("../../../../services/store/index.js");
function AutoUpdateTimezone() {
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const timezone = (0, store_1.useUserStore)(state => state.timezone);
    const { handleTimezoneChange } = (0, useUserSettings_1.default)();
    (0, react_1.useEffect)(() => {
        if (isVisitor === user_1.VisitorEnum.NO && !timezone) {
            const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
            handleTimezoneChange(timeZone);
        }
    }, [handleTimezoneChange, isVisitor, timezone]);
    return null;
}
