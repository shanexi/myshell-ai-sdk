"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lodash_es_1 = require("lodash-es");
const navigation_1 = require("next/navigation");
const react_2 = require("@chakra-ui/react");
const utils_1 = require("../../../../../lib/utils.js");
const clsx_1 = __importDefault(require("clsx"));
const lodash_es_2 = require("lodash-es");
const next_intl_1 = require("next-intl");
const react_dnd_1 = require("react-dnd");
const button_1 = require("../../../../../common/components/ui/button.js");
const store_provider_1 = require("../store-provider/index.js");
const widget_provider_1 = require("../widget-provider/index.js");
const material_provider_1 = require("../material-provider/index.js");
const state_1 = require("../../material/state/index.js");
const uuid_1 = require("../../../../../common/components/nocode/utils/uuid.js");
const getDefaultValueBySchema_1 = require("../../../../../common/components/form-engine/utils/getDefaultValueBySchema.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const rectangle_group_1 = require("../../../../../common/components/ui/icons/solid/rectangle-group.js");
const caret_down_1 = require("../../../../../common/components/ui/icons/solid/caret-down.js");
const x_mark_1 = require("../../../../../common/components/ui/icons/outline/x-mark.js");
const code_1 = require("../../../../../common/components/ui/icons/solid/code.js");
const avatar_1 = require("../../../../../common/components/ui/avatar.js");
const window_1 = require("../../../../../common/components/ui/icons/outline/window.js");
const Automata = ({ tree }) => {
    const { children, path } = tree;
    const stateRef = (0, react_1.useRef)(null);
    const store = (0, store_provider_1.useStoreContext)();
    const i18n = (0, next_intl_1.useTranslations)('nocode');
    const attrs = (0, store_provider_1.useStore)(store, state => state.attrs) || {};
    const nodes = (0, store_provider_1.useStore)(store, state => state.nodes) || {};
    const active = (0, store_provider_1.useStore)(store, state => state.active) || '';
    const append = (0, store_provider_1.useStore)(store, state => state.append);
    const setActive = (0, store_provider_1.useStore)(store, state => state.setActive);
    if (!(attrs[path] && nodes[path])) {
        return null;
    }
    const { name } = nodes[path];
    const onActive = () => {
        if (active !== path) {
            setActive(path);
        }
    };
    const onAddState = () => {
        const name = 'state' + children.length;
        const attr = (0, lodash_es_1.merge)((0, getDefaultValueBySchema_1.getDefaultValueBySchema)(state_1.State.schema || {}), {
            name
        });
        append(path, {
            attr: (0, lodash_es_1.omit)(attr, 'render.audio', 'render.image'),
            node: {
                type: 'state',
                title: name,
                name: (0, uuid_1.uuid)(),
                pkg: 'state'
            }
        });
        setTimeout(() => {
            stateRef?.current?.scrollTo?.({
                top: 10000
            });
        });
    };
    const cls = (0, utils_1.cn)('p-1.5 border-default border rounded-md flex items-center cursor-pointer hover:border-brand', {
        'bg-surface-container-selected-default': path === active,
        'bg-surface-default': path !== active
    });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: cls, onClick: onActive, children: [(0, jsx_runtime_1.jsx)(window_1.Window, { size: "lg", color: "default", className: "mr-3" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "default", lineClamp: 1, children: name })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { ref: stateRef, style: { maxHeight: 'calc(100vh - 300px)' }, className: "pl-7 py-2 space-y-2 overflow-y-scroll no-scrollbar", children: children.map((child, i) => ((0, jsx_runtime_1.jsx)(Menu, { tree: child, index: i }, child.path))) }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center ml-7 px-4 py-1 bg-surface-default border-default border rounded-md cursor-pointer", onClick: onAddState, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1.5", children: [(0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", width: "18", height: "18", className: "text-brand", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-brand rounded-md", children: i18n('widget.add') })] }) })] })] }));
};
const WidgetItem = ({ name, description, logoUrl, onClick }) => {
    const i18n = (0, next_intl_1.useTranslations)('nocode');
    const [isHiddenAdd, setHiddenAdd] = (0, react_1.useState)(true);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center py-5 space-x-3", onMouseEnter: () => setHiddenAdd(false), onMouseLeave: () => setHiddenAdd(true), children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: logoUrl, size: "4xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: "default", weight: "medium", lineClamp: 1, children: name }), description ? ((0, jsx_runtime_1.jsx)(typography_1.Paragraph, { size: "sm", color: "subtler", lineClamp: 2, children: description })) : null] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", size: "sm", onClick: onClick, className: (0, utils_1.cn)({ hidden: isHiddenAdd }), children: i18n('widget.add') })] }));
};
const State = ({ tree }) => {
    const { path, children } = tree;
    const i18n = (0, next_intl_1.useTranslations)('nocode');
    const router = (0, navigation_1.useRouter)();
    const store = (0, store_provider_1.useStoreContext)();
    const { install } = (0, material_provider_1.useMaterialContext)();
    const { widgets } = (0, widget_provider_1.useWidgetContext)();
    const nodes = (0, store_provider_1.useStore)(store, state => state.nodes) || {};
    const active = (0, store_provider_1.useStore)(store, state => state.active) || '';
    const setActive = (0, store_provider_1.useStore)(store, state => state.setActive);
    const append = (0, store_provider_1.useStore)(store, state => state.append);
    const reorder = (0, store_provider_1.useStore)(store, state => state.reorder);
    const [isToggle, setToggle] = (0, react_1.useState)(true);
    const [isOpen, setOpen] = (0, react_1.useState)(false);
    if (!nodes[path] || !widgets) {
        return null;
    }
    const { title } = nodes[path];
    const onActive = () => {
        if (active !== path) {
            setActive(path);
        }
    };
    const onToggle = () => {
        setToggle(!isToggle);
    };
    const onOpen = () => {
        setOpen(true);
    };
    const onCLose = () => {
        setOpen(false);
    };
    const onAddWidget = (widgetId) => {
        const widget = widgets.find(({ id }) => widgetId === id);
        if (widget) {
            const { name, id } = widget;
            const { schema } = install('widget', widget) || {};
            if (schema) {
                const attr = (0, lodash_es_1.merge)((0, getDefaultValueBySchema_1.getDefaultValueBySchema)(schema), {
                    name,
                    module_type: 'AnyWidgetModule',
                    module_config: {
                        widget_id: id
                    }
                });
                append(path, {
                    attr,
                    node: {
                        type: 'widget',
                        title: name,
                        name: id,
                        pkg: `widget_${id}`
                    }
                });
            }
        }
        setOpen(false);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('bg-surface-container-default rounded-md overflow-hidden', {
            'bg-surface-container-selected-default': path === active
        }), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex items-center space-x-1.5 pl-3.5 pr-2 bg-surface-default border border-default cursor-pointer hover:border-brand', {
                    'bg-surface-container-selected-pressed': path === active,
                    'rounded-t-md': isToggle,
                    'rounded-md': !isToggle
                }), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex items-center space-x-1.5 py-2.5", onClick: onActive, children: [(0, jsx_runtime_1.jsx)(code_1.Code, { size: "lg", color: "default" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "default", lineClamp: 1, children: title })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-5 h-5 flex items-center justify-center", onClick: onToggle, children: (0, jsx_runtime_1.jsx)(caret_down_1.CaretDown, { color: "subtlest", size: "2xs", rotate: !isToggle ? '90' : undefined }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('p-2 space-y-2', { hidden: !isToggle }), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('space-y-2'), children: children.map((child, i) => ((0, jsx_runtime_1.jsx)(Menu, { tree: child, index: i, reorder: reorder }, child.path))) }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center px-4 py-1 bg-surface-default border-default border rounded-md cursor-pointer", onClick: onOpen, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1.5", children: [(0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5 h-5 text-brand", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-brand rounded-md", children: i18n('widget.add') })] }) })] }), (0, jsx_runtime_1.jsxs)(react_2.Modal, { isOpen: isOpen, onClose: onCLose, size: "3xl", isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_2.ModalOverlay, {}), (0, jsx_runtime_1.jsxs)(react_2.ModalContent, { className: (0, clsx_1.default)('h-[580px] rounded-4xl bg-surface-default'), children: [(0, jsx_runtime_1.jsx)(react_2.ModalHeader, { className: "px-4 py-5 text-xl text-default border-b border-default font-normal", children: "Recently Widgets" }), (0, jsx_runtime_1.jsx)(react_2.ModalCloseButton, { className: "text-default w-5.5 h-5.5", top: "5", right: "5" }), (0, jsx_runtime_1.jsx)(react_2.ModalBody, { className: "px-5 py-0 overflow-y-auto overflow-x-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-x-4", children: widgets.map(({ name, description, logoUrl, id }, i) => {
                                        return ((0, jsx_runtime_1.jsx)(WidgetItem, { name: name, description: description, logoUrl: logoUrl, onClick: (0, lodash_es_2.debounce)(() => onAddWidget(id), 500) }, i));
                                    }) }) }), (0, jsx_runtime_1.jsx)(react_2.ModalFooter, { className: "p-4 border-t border-default", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", variant: "outline", onClick: () => router.push('/robot-workshop'), children: "Go to Widgets" }) })] })] })] }));
};
const Widget = ({ tree, index, reorder }) => {
    const { path } = tree;
    const store = (0, store_provider_1.useStoreContext)();
    const { widgets = [] } = (0, widget_provider_1.useWidgetContext)();
    const nodes = (0, store_provider_1.useStore)(store, state => state.nodes) || {};
    const attrs = (0, store_provider_1.useStore)(store, state => state.attrs) || {};
    const active = (0, store_provider_1.useStore)(store, state => state.active) || '';
    const setActive = (0, store_provider_1.useStore)(store, state => state.setActive);
    const remove = (0, store_provider_1.useStore)(store, state => state.remove);
    const [isHiddenX, setHiddenX] = (0, react_1.useState)(true);
    const ref = (0, react_1.useRef)(null);
    const [{ handlerId }, drop] = (0, react_dnd_1.useDrop)({
        accept: 'Widget',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            };
        },
        hover(item) {
            if (!ref.current || !reorder) {
                return;
            }
            const startIndex = item.index;
            const endIndex = index;
            if (startIndex === endIndex) {
                return;
            }
            reorder(path, {
                startIndex,
                endIndex
            });
            item.index = endIndex;
        }
    });
    const [{ opacity }, drag] = (0, react_dnd_1.useDrag)({
        type: 'Widget',
        item: () => {
            return { id: path, index };
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1
        })
    });
    if (!(nodes[path] && attrs[path])) {
        return null;
    }
    const onActive = () => {
        if (active !== path) {
            setActive(path);
        }
    };
    const onRemove = () => {
        remove(path);
    };
    const onMouseEnter = () => {
        setHiddenX(false);
    };
    const onMouseLevel = () => {
        setHiddenX(true);
    };
    const { title } = nodes[path];
    const { module_config: { widget_id } } = attrs[path];
    const cls = (0, utils_1.cn)('flex items-center p-1.5 bg-surface-default border border-default cursor-pointer rounded-md hover:border-brand', { 'bg-surface-primary-default border-brand': active === path });
    const widget = widgets.find(({ id }) => widget_id === id);
    drag(drop(ref));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, utils_1.cn)(cls), style: { opacity }, onClick: onActive, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLevel, "data-handler-id": handlerId, children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: "xs", src: widget?.logoUrl, className: "mr-2" }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: active === path ? 'static' : 'default', lineClamp: 1, children: title }) }), (0, jsx_runtime_1.jsx)(x_mark_1.XMark, { size: "md", color: active === path ? 'static' : 'default', className: (0, utils_1.cn)('cursor-pointer', { hidden: isHiddenX }), onClick: onRemove })] }));
};
const Menu = ({ tree, index, reorder }) => {
    const { path } = tree;
    const store = (0, store_provider_1.useStoreContext)();
    const nodes = (0, store_provider_1.useStore)(store, state => state.nodes) || {};
    const node = nodes[path];
    switch (node.type) {
        case 'automata':
            return (0, jsx_runtime_1.jsx)(Automata, { tree: tree });
        case 'state':
            return (0, jsx_runtime_1.jsx)(State, { tree: tree });
        case 'widget':
            return (0, jsx_runtime_1.jsx)(Widget, { tree: tree, index: index, reorder: reorder });
        default:
            return null;
    }
};
const TreeMenu = () => {
    const store = (0, store_provider_1.useStoreContext)();
    const tree = (0, store_provider_1.useStore)(store, state => state.tree);
    if (!tree) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "px-1 py-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center p-2.5 border-default border-b", children: [(0, jsx_runtime_1.jsx)(rectangle_group_1.RectangleGroup, { size: "md", color: "subtlest", className: "mr-2" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: "default", children: "APP Overview" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-2", children: (0, jsx_runtime_1.jsx)(Menu, { tree: tree, index: 0 }) })] }));
};
exports.TreeMenu = TreeMenu;
