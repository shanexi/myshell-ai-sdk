"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingEngine = SettingEngine;
const jsx_runtime_1 = require("react/jsx-runtime");
const code_editor_1 = __importDefault(require("../../../../../common/components/code-editor/index.js"));
const views_1 = __importDefault(require("../../../../../common/components/file-uploader/views/index.js"));
const form_engine_1 = require("../../../../../common/components/form-engine/index.js");
const checkbox_1 = require("../../../../../common/components/ui/checkbox.js");
const input_1 = require("../../../../../common/components/ui/input.js");
const number_input_1 = require("../../../../../common/components/ui/number-input.js");
const select_1 = require("../../../../../common/components/ui/select.js");
const slider_1 = require("../../../../../common/components/ui/slider.js");
const switch_1 = require("../../../../../common/components/ui/switch.js");
const textarea_1 = require("../../../../../common/components/ui/textarea.js");
const getData_1 = require("../../utils/getData.js");
const getSchema_1 = require("../../utils/getSchema.js");
const exp_input_1 = require("../exp-input/index.js");
const exp_select_1 = require("../exp-select/index.js");
const json_editor_1 = require("../json-editor/index.js");
const json_error_1 = require("../json-error/index.js");
const material_provider_1 = require("../material-provider/index.js");
const payload_config_1 = require("../payload-config/index.js");
const state_provider_1 = require("../state-provider/index.js");
const store_provider_1 = require("../store-provider/index.js");
const suffix_buttons_1 = require("../suffix-buttons/index.js");
const target_inputs_1 = require("../target-inputs/index.js");
const variable_provider_1 = require("../variable-provider/index.js");
function SettingEngine(props) {
    const { i18n } = props;
    const store = (0, store_provider_1.useStoreContext)();
    const { load } = (0, material_provider_1.useMaterialContext)();
    const { id } = (0, variable_provider_1.useVariableContext)();
    const state = (0, state_provider_1.useStateContext)();
    const jsonModeKey = (0, state_provider_1.useStore)(state, state => state.key);
    const tree = (0, store_provider_1.useStore)(store, state => state.tree);
    const attrs = (0, store_provider_1.useStore)(store, state => state.attrs);
    const nodes = (0, store_provider_1.useStore)(store, state => state.nodes);
    const active = (0, store_provider_1.useStore)(store, state => state.active);
    const modify = (0, store_provider_1.useStore)(store, state => state.modify);
    if (!(attrs && nodes && tree && active && attrs[active] && nodes[active])) {
        return null;
    }
    const { pkg } = nodes[active];
    const material = load(pkg);
    if (!material) {
        return null;
    }
    const schema = (0, getSchema_1.getSchema)(material, { path: active, tree, nodes, attrs });
    if (!schema) {
        return null;
    }
    const data = (0, getData_1.getData)(active, { tree, nodes, attrs });
    const onChange = (values) => {
        modify(active, { attr: values });
    };
    return ((0, jsx_runtime_1.jsx)(form_engine_1.MemoizedFormEngine, { mode: "onChange", values: data, schema: schema, components: {
            Input: input_1.Input,
            Switch: switch_1.Switch,
            Textarea: textarea_1.Textarea,
            Select: select_1.Select,
            Slider: slider_1.Slider,
            SliderSingle: slider_1.SliderSingle,
            NumberInput: number_input_1.NumberInput,
            Checkbox: checkbox_1.Checkbox,
            FileUpload: views_1.default,
            ExpInput: exp_input_1.ExpInput,
            TargetInputs: target_inputs_1.TargetInputs,
            PayloadConfig: payload_config_1.PayloadConfig,
            CodeEditor: code_editor_1.default,
            ExpSelect: exp_select_1.ExpSelect,
            SuffixButtons: suffix_buttons_1.SuffixButtons,
            JsonEditor: json_editor_1.JsonEditor,
            JsonError: json_error_1.JsonError
        }, onChange: onChange, i18n: i18n }, `${active}${id}${jsonModeKey}`));
}
