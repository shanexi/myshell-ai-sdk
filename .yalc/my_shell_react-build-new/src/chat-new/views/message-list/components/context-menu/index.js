"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenuProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_es_1 = require("lodash-es");
const react_1 = require("react");
const react_use_1 = require("react-use");
const common_1 = require("../../../../../apis/common.js");
const ImgVideoPreview_1 = __importDefault(require("../../../../../chat/views/chat-body/file-display/img-video/preview/ImgVideoPreview.js"));
const context_menu_1 = require("../../../../../common/components/ui/context-menu.js");
const image_menu_items_1 = __importDefault(require("./image-menu-items.js"));
const message_menu_items_1 = __importDefault(require("./message-menu-items.js"));
const display_provider_1 = require("../display-provider/index.js");
const ContextMenuProvider = ({ children }) => {
    const { actions } = (0, display_provider_1.useDisplayContext)();
    const [previewImage, setPreviewImage] = (0, react_1.useState)();
    const [viewModalVisible, setViewModalVisible] = (0, react_1.useState)(false);
    const [isImage, setIsImage] = (0, react_1.useState)(false);
    const [xImage, setXImage] = (0, react_1.useState)();
    const isMiddle = (0, react_use_1.useMedia)('(max-width: 768px)');
    const onContextMenu = (event) => {
        const isImage = event?.target?.tagName?.toUpperCase() === 'IMG';
        if (isMiddle && (event.type === 'contextmenu' || isImage)) {
            event.preventDefault();
            return;
        }
        setIsImage(isImage);
        if (isImage) {
            const imageData = { url: event?.target?.getAttribute('src'), ...event?.target?.getAttribute('x-image-data') };
            setXImage(imageData);
        }
        if ((0, lodash_es_1.isEmpty)(actions) && !isImage) {
            event.preventDefault();
        }
    };
    const onDomClick = (event) => {
        if (event?.target?.tagName?.toUpperCase() === 'IMG' && event?.target?.getAttribute('x-intercept-click') === '1') {
            setPreviewImage({
                url: event?.target?.getAttribute('src'),
                title: event?.target?.getAttribute('alt'),
                type: common_1.EmbedObjType.IMAGE,
                status: common_1.EmbedObjStatus.DONE,
                extensionName: '',
                iconUrl: ''
            });
            setViewModalVisible(true);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenu, { children: [(0, jsx_runtime_1.jsx)(context_menu_1.ContextMenuTrigger, { onContextMenu: onContextMenu, onClick: onDomClick, children: children }), (0, jsx_runtime_1.jsx)(context_menu_1.ContextMenuContent, { children: isImage ? (0, jsx_runtime_1.jsx)(image_menu_items_1.default, { url: xImage?.url, imageModel: xImage?.imageModel }) : (0, jsx_runtime_1.jsx)(message_menu_items_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(ImgVideoPreview_1.default, { open: viewModalVisible, onClose: () => {
                    setViewModalVisible(false);
                }, imgVideoList: previewImage ? [previewImage] : [], activeIndex: 0 })] }));
};
exports.ContextMenuProvider = ContextMenuProvider;
