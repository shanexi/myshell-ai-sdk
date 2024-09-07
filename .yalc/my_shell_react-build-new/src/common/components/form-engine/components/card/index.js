"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const react_dnd_1 = require("react-dnd");
const react_hook_form_1 = require("react-hook-form");
const form_1 = require("../../../../../common/components/ui/form.js");
const trash_1 = require("../../../../../common/components/ui/icons/outline/trash.js");
const drag_1 = require("../../../../../common/components/ui/icons/solid/drag.js");
const switch_1 = require("../../../../../common/components/ui/switch.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const utils_1 = require("../../../../../lib/utils.js");
const getDefaultValueBySchema_1 = require("../../utils/getDefaultValueBySchema.js");
const control_1 = __importDefault(require("../control/index.js"));
const edit_title_1 = require("../edit-title/index.js");
const provider_1 = require("../provider/index.js");
const Card = props => {
    const { name = '', index, children, error } = props;
    const { fields, remove, append, reorder, replaceKey, components } = (0, provider_1.useFormEngineContext)();
    const { getValues, setValue } = (0, react_hook_form_1.useFormContext)();
    const { control } = (0, react_hook_form_1.useFormContext)();
    const { schema, parent } = fields[name] || {};
    const [oldValue, setOldValue] = (0, react_1.useState)();
    const dragRef = (0, react_1.useRef)(null);
    const [{ handlerId }, drop] = (0, react_dnd_1.useDrop)({
        accept: parent,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            };
        },
        hover(item) {
            if (!dragRef.current || index === undefined) {
                return;
            }
            const startIndex = item.index;
            const endIndex = index;
            if (startIndex === endIndex) {
                return;
            }
            reorder(name, startIndex, endIndex);
            item.index = endIndex;
        }
    });
    const [{ opacity }, drag, preview] = (0, react_dnd_1.useDrag)(() => ({
        type: parent,
        item: () => {
            return { id: name, index };
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
            opacity: monitor.isDragging() ? 0 : 1
        })
    }));
    if (!schema) {
        return null;
    }
    const { type, title } = schema;
    const cls = 'rounded-lg border border-default divide-y overflow-hidden';
    const { 'x-draggable': xDraggable, 'x-title-editable': xTitleEditable, 'x-title-component-props': xTitleComponentProps, 'x-switchable': xSwithable, 'x-switchable-default': xSwitchableDefault, 'x-switch-default-value': xSwitchDefaultValue, 'x-deletable': xDeletable, 'x-addable': xAddable, 'x-component': xComponent, 'x-error-component': xErrorComponent, 'x-empty': xEmpty, 'x-hidden': xHidden } = schema;
    const [checked, setChecked] = (0, react_1.useState)(!!getValues(name) || xSwitchableDefault);
    const onDelete = () => {
        remove(name);
    };
    const onAdd = () => {
        if (!error) {
            append(name);
        }
    };
    const onKeyChange = (key, value) => {
        replaceKey(name, key, value);
    };
    const onCheckedChange = (checked) => {
        if (!checked) {
            setOldValue(getValues(name));
        }
        setValue(name, checked ? oldValue || (0, getDefaultValueBySchema_1.getDefaultValueBySchema)(schema, true) : xSwitchDefaultValue);
        setChecked(checked);
    };
    let titleControl = null;
    react_1.default.Children.forEach(children, child => {
        if (!react_1.default.isValidElement(child)) {
            return;
        }
        const { schema: childSchema } = fields[child.props.name] || {};
        if (!childSchema) {
            return;
        }
        const { 'x-role': xRole } = childSchema;
        if (xRole === 'title') {
            titleControl = child;
        }
    });
    if (xTitleEditable) {
        titleControl = ((0, jsx_runtime_1.jsx)(edit_title_1.EditTitle, { ...xTitleComponentProps, defaultValue: title, onKeyChange: (key, value) => {
                onKeyChange(key, value);
            }, onChange: e => {
                onKeyChange(e.target.value);
            }, path: name }));
    }
    const renderTitle = () => {
        return titleControl ? ((0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: titleControl })) : title ? ((0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h4", children: title }) })) : null;
    };
    drag(drop(dragRef));
    const renderHeader = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "h-[28px] flex items-center space-x-1", ref: preview, children: [xDraggable ? ((0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 flex items-center justify-center cursor-grab", role: "Handle", "data-handler-id": handlerId, ref: dragRef, children: (0, jsx_runtime_1.jsx)(drag_1.Drag, { size: "md", color: "subtle" }) })) : null, renderTitle(), xDeletable ? ((0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 flex items-center justify-center cursor-pointer", onClick: onDelete, children: (0, jsx_runtime_1.jsx)(trash_1.Trash, { size: "md", color: "subtle" }) })) : null, xAddable && checked ? ((0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 flex items-center justify-center cursor-pointer", onClick: onAdd, children: (0, jsx_runtime_1.jsx)("svg", { className: (0, clsx_1.default)('', { 'cursor-not-allowed opacity-30': error }), width: "18", height: "28", viewBox: "0 0 18 28", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsx)("path", { d: "M8.99994 7.8125C9.3106 7.8125 9.56244 8.06434 9.56244 8.375V13.4375H14.6249C14.9356 13.4375 15.1874 13.6893 15.1874 14C15.1874 14.3107 14.9356 14.5625 14.6249 14.5625H9.56244V19.625C9.56244 19.9357 9.3106 20.1875 8.99994 20.1875C8.68928 20.1875 8.43744 19.9357 8.43744 19.625V14.5625H3.37494C3.06428 14.5625 2.81244 14.3107 2.81244 14C2.81244 13.6893 3.06428 13.4375 3.37494 13.4375H8.43744V8.375C8.43744 8.06434 8.68928 7.8125 8.99994 7.8125Z" }) }) })) : null, xSwithable ? (0, jsx_runtime_1.jsx)(switch_1.Switch, { onCheckedChange: onCheckedChange, checked: checked }) : null] }));
    };
    if (xErrorComponent && error) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)(cls, { hidden: xHidden }), "data-ui": "card", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-surface-default space-y-4", children: title ? renderHeader() : null }), react_1.default.createElement(components[xErrorComponent], {})] }));
    }
    if (xComponent) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)(cls, { hidden: xHidden }), "data-ui": "card", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-surface-default space-y-4", children: title ? renderHeader() : null }), checked ? ((0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-surface-subtle border-default", children: (0, jsx_runtime_1.jsx)(control_1.default, { name: name }) })) : null] }));
    }
    const render = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: cls, "data-ui": "card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-3 bg-surface-default space-y-4 rounded-lg", children: [renderHeader(), checked &&
                            react_1.default.Children.map(children, (child, i) => {
                                if (!react_1.default.isValidElement(child)) {
                                    return null;
                                }
                                const { schema: childSchema } = fields[child.props.name] || {};
                                if (!childSchema) {
                                    return null;
                                }
                                const { 'x-role': xRole } = childSchema;
                                if (xRole !== 'core') {
                                    return null;
                                }
                                return child;
                            }), checked && react_1.default.Children.count(children) === 0 && xEmpty && ((0, jsx_runtime_1.jsxs)("div", { className: "h-24 flex flex-col items-center justify-center border border-default shadow-background-default ring-offset-surface-default bg-surface-default text-subtle space-y-1 cursor-pointer", children: [(0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm", children: xEmpty.text })] }))] }), checked &&
                    react_1.default.Children.map(children, (child, i) => {
                        if (!react_1.default.isValidElement(child)) {
                            return null;
                        }
                        const { schema: childSchema } = fields[child.props.name] || {};
                        if (!childSchema) {
                            return null;
                        }
                        const { 'x-role': xRole, 'x-hidden': xHidden } = childSchema;
                        if (xRole === 'core' || xRole === 'title') {
                            return null;
                        }
                        return !xHidden ? ((0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-surface-subtle border-default", children: child }, i)) : (child);
                    })] }));
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)({ hidden: xHidden }), style: { opacity }, "data-ui": "card", ref: drop, children: type === 'void' ? render() : (0, jsx_runtime_1.jsx)(form_1.FormField, { control: control, name: name, render: render }) }));
};
exports.default = Card;
