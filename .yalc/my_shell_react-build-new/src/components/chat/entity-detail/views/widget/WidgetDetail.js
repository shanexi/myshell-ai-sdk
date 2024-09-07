"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WidgetDetail;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
const sensors_1 = require("../../../../../lib/sensors/index.js");
const ShowDetailBtn_1 = __importDefault(require("../common/ShowDetailBtn.js"));
const Author_1 = __importDefault(require("../common/author/Author.js"));
const Description_1 = __importDefault(require("../common/description/Description.js"));
const Logo_1 = __importDefault(require("../common/logo/Logo.js"));
const ShareBtn_1 = __importDefault(require("../common/share/views/ShareBtn.js"));
const Tags_1 = __importDefault(require("../common/tags/Tags.js"));
const WidgetCopyBtn_1 = require("./WidgetCopyBtn.js");
const WidgetDesc_1 = __importDefault(require("./WidgetDesc.js"));
function WidgetDetail({ type, id, name, logoUrl, tags, description = '', author }) {
    const sensors = (0, sensors_1.useSensors)();
    const shareTracker = () => {
        sensors?.track('ShareItem', {
            item_type: 'widget',
            item_id: id,
            item_name: name
        });
    };
    const parsedTags = tags.map((tag, index) => {
        if (index === 0) {
            return {
                ...tag,
                extra: {
                    ...tag.extra,
                    hoverText: (0, jsx_runtime_1.jsx)(WidgetDesc_1.default, {})
                }
            };
        }
        return tag;
    });
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-2 md:gap-5", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 md:gap-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(Logo_1.default, { src: (0, common_helper_1.getAssetsUrlV2)(logoUrl) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 grow overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-1", children: (0, jsx_runtime_1.jsx)("p", { className: "text-lg leading-[26px] md:text-xl font-[590] text-default", children: name }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex", children: (0, jsx_runtime_1.jsx)(Author_1.default, { name: author?.name, nameTag: author?.nameTag }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "h-full flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(ShowDetailBtn_1.default, {}), (0, jsx_runtime_1.jsx)(ShareBtn_1.default, { type: type, id: id, trackerFn: shareTracker }), (0, jsx_runtime_1.jsx)(WidgetCopyBtn_1.WidgetCopyBtn, { widgetId: id })] })] }), (!!tags.length || description) && ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 md:gap-4", children: [(0, jsx_runtime_1.jsx)(Tags_1.default, { tags: parsedTags }), (0, jsx_runtime_1.jsx)(Description_1.default, { desc: description })] }))] }) }));
}
