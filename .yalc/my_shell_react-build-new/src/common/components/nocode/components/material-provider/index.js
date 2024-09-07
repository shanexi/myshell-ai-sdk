"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialProvider = exports.useMaterialContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_es_1 = require("lodash-es");
const react_1 = require("react");
const automata_1 = require("../../material/automata/index.js");
const state_1 = require("../../material/state/index.js");
const widget_1 = require("../../material/widget/index.js");
const getSchemaByWidget_1 = require("../../utils/getSchemaByWidget.js");
const widget_provider_1 = require("../widget-provider/index.js");
const cache = {
    automata: automata_1.AutoMata,
    state: state_1.State,
    widget: widget_1.Widget
};
const install = (type, widget) => {
    const pkg = widget?.id ? `${type}_${widget.id}` : type;
    if (cache[pkg]) {
        return cache[pkg];
    }
    if (widget?.id && widget?.settings) {
        const { type, schema } = widget_1.Widget;
        cache[pkg] = {
            type,
            schema: (0, lodash_es_1.merge)({}, schema, (0, getSchemaByWidget_1.getSchemaByWidget)(widget.settings))
        };
        return cache[pkg];
    }
};
const load = (pkg) => {
    return cache[pkg];
};
const MaterialContext = (0, react_1.createContext)({ install, load });
const useMaterialContext = () => {
    return (0, react_1.useContext)(MaterialContext);
};
exports.useMaterialContext = useMaterialContext;
const MaterialProvider = props => {
    const { widgets = [] } = (0, widget_provider_1.useWidgetContext)();
    const { children } = props;
    (0, react_1.useEffect)(() => {
        widgets.forEach(widget => {
            install('widget', widget);
        });
    }, [widgets]);
    return (0, jsx_runtime_1.jsx)(MaterialContext.Provider, { value: { install, load }, children: children });
};
exports.MaterialProvider = MaterialProvider;
