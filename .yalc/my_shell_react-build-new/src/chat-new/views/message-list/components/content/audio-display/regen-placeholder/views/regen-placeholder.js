"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegenPlaceholder;
const jsx_runtime_1 = require("react/jsx-runtime");
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/PlayIcon"));
const react_1 = require("react");
const MessageContext_1 = require("../../../../../../../../chat-new/context/MessageContext.js");
const StaticContext_1 = require("../../../../../../../../chat-new/context/StaticContext.js");
const icon_button_1 = require("../../../../../../../../common/components/ui/icon-button.js");
const common_helper_1 = require("../../../../../../../../common/utils/common-helper.js");
const display_provider_1 = require("../../../../display-provider/index.js");
const useRegenerate_1 = __importDefault(require("../hooks/useRegenerate.js"));
function RegenPlaceholder() {
    const { type, entityInfo, setEnergyInfo } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { partialUpdateMessage, enQueue } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const { id } = entityInfo;
    const { message } = (0, display_provider_1.useDisplayContext)();
    const { generating, handleRegenerate } = (0, useRegenerate_1.default)(type, id, partialUpdateMessage, enQueue, setEnergyInfo);
    const onRegenerate = () => {
        handleRegenerate(message?.id);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 w-full overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-primary h-px w-0 items-start" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { className: "w-6 h-6", onClick: onRegenerate, loading: generating, children: (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "size-3 ml-0.5" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col grow overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-brand truncate", children: (0, common_helper_1.durationFormatter)(0) }) })] })] }));
}
