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
exports.MemoizedFormEngine = exports.FieldsSlot = exports.FormEngine = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_es_1 = require("lodash-es");
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const form_1 = require("../../../common/components/ui/form.js");
const edit_title_1 = require("./components/edit-title/index.js");
const provider_1 = require("./components/provider/index.js");
const recursion_1 = __importDefault(require("./components/recursion/index.js"));
const fields_1 = __importDefault(require("./utils/fields.js"));
const generateI18nSchema_1 = require("../nocode/utils/generateI18nSchema.js");
const FormEngine = props => {
    const { id, children, mode = 'all', schema: i18nSchema, components, values = {}, onChange, onSubmit, i18n } = props;
    const schema = (0, react_1.useMemo)(() => (0, generateI18nSchema_1.generateI18nSchema)(i18nSchema, i18n), [i18nSchema]);
    const [fields, setFields] = (0, react_1.useState)((0, fields_1.default)(schema, values));
    const form = (0, react_hook_form_1.useForm)({
        mode,
        defaultValues: values
    });
    const { watch, handleSubmit } = form;
    (0, react_1.useEffect)(() => {
        const subscription = watch((0, lodash_es_1.debounce)(values => {
            setFields((0, fields_1.default)(schema, values));
        }, 100));
        return () => subscription.unsubscribe();
    }, []);
    (0, react_1.useEffect)(() => {
        const subscription = watch((0, lodash_es_1.debounce)(values => {
            if (onChange) {
                onChange(values);
            }
        }, 500));
        return () => subscription.unsubscribe();
    }, []);
    return ((0, jsx_runtime_1.jsx)(form_1.Form, { ...form, children: (0, jsx_runtime_1.jsx)(provider_1.FormEngineProvider, { fields: fields, components: { ...components, EditTitle: edit_title_1.EditTitle }, children: (0, jsx_runtime_1.jsxs)("form", { id: id, onSubmit: onSubmit ? handleSubmit(onSubmit) : undefined, children: [(0, jsx_runtime_1.jsx)(recursion_1.default, {}), children] }) }) }));
};
exports.FormEngine = FormEngine;
const FieldsSlot = ({ children }) => {
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.FieldsSlot = FieldsSlot;
const MemoizedFormEngine = react_1.default.memo(FormEngine, () => true);
exports.MemoizedFormEngine = MemoizedFormEngine;
