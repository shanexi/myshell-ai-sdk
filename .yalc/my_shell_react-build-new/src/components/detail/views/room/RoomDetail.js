"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RoomDetail;
const jsx_runtime_1 = require("react/jsx-runtime");
const Logo_1 = __importDefault(require("../../../../components/chat/entity-detail/views/common/logo/Logo.js"));
const ShareBtn_1 = __importDefault(require("../../../../components/chat/entity-detail/views/common/share/views/ShareBtn.js"));
const sensors_1 = require("../../../../lib/sensors/index.js");
function RoomDetail({ type, id, name, logoUrl, buttonSlot }) {
    const sensors = (0, sensors_1.useSensors)();
    const shareTracker = () => {
        sensors?.track('ShareItem', {
            item_type: 'widget',
            item_id: id,
            item_name: name
        });
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-2 md:gap-5", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-3 md:gap-5", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(Logo_1.default, { src: logoUrl }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-1 grow overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-1", children: (0, jsx_runtime_1.jsx)("p", { className: "text-lg leading-[26px] md:text-xl font-[590] text-default", children: name }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "h-full flex items-center gap-1", children: [buttonSlot, (0, jsx_runtime_1.jsx)(ShareBtn_1.default, { type: type, id: id, trackerFn: shareTracker })] })] }) }) }));
}
