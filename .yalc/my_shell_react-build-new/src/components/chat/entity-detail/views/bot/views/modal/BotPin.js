"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BotPin;
const jsx_runtime_1 = require("react/jsx-runtime");
const StarIcon_1 = __importDefault(require("@heroicons/react/24/outline/StarIcon"));
const StarIcon_2 = __importDefault(require("@heroicons/react/24/solid/StarIcon"));
const react_1 = require("react");
const react_use_1 = require("react-use");
const bot_1 = require("../../../../../../../apis/bot.js");
const icon_button_1 = require("../../../../../../../common/components/ui/icon-button.js");
function BotPin({ id, pinned, setPinned }) {
    const [pinActing, setPinActing] = (0, react_use_1.useToggle)(false);
    const togglePin = (0, react_1.useCallback)(async () => {
        try {
            setPinActing(true);
            const res = await (0, bot_1.setBotPinnedStatus)(id, !pinned);
            if (res.success) {
                setPinned(!pinned);
            }
        }
        catch (e) {
        }
        finally {
            setPinActing(false);
        }
    }, [id, pinned, setPinActing, setPinned]);
    return ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { loading: pinActing, variant: "ghost", color: "default", size: "md", onClick: togglePin, children: pinned ? ((0, jsx_runtime_1.jsx)(StarIcon_2.default, { className: "!text-[#FAAC00] w-5.5 h-5.5" })) : ((0, jsx_runtime_1.jsx)(StarIcon_1.default, { className: " w-5.5 h-5.5 text-brand" })) }));
}
