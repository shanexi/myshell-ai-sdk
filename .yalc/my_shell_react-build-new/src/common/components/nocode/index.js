"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoCode = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_es_1 = require("lodash-es");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_dnd_1 = require("react-dnd");
const react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
const workshop_1 = require("../../../apis/workshop.js");
const header_1 = require("./components/header/index.js");
const layout_1 = require("./components/layout/index.js");
const material_provider_1 = require("./components/material-provider/index.js");
const setting_engine_1 = require("./components/setting-engine/index.js");
const state_provider_1 = require("./components/state-provider/index.js");
const store_provider_1 = require("./components/store-provider/index.js");
const tree_menu_1 = require("./components/tree-menu/index.js");
const variable_provider_1 = require("./components/variable-provider/index.js");
const widget_provider_1 = require("./components/widget-provider/index.js");
const const_1 = require("./utils/const.js");
const NoCode = props => {
    const { data = const_1.DEFAULT_DATA, widgetIds = [], loading, onSave, onClose, onChange } = props;
    const i18n = (0, next_intl_1.useTranslations)('nocode');
    const [widgets, setWidgets] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const fetchWidgets = async (ids) => {
            const { success, data } = await (0, workshop_1.getWidgetsInfo)((0, lodash_es_1.uniq)(ids));
            if (success && data) {
                setWidgets(data
                    .filter(({ showCopyProConfig }) => showCopyProConfig)
                    .map(({ id, name, description, logoUrl, settings }) => {
                    return {
                        id,
                        name,
                        description,
                        logoUrl,
                        settings
                    };
                }));
            }
        };
        fetchWidgets(widgetIds);
    }, []);
    return ((0, jsx_runtime_1.jsx)(react_dnd_1.DndProvider, { backend: react_dnd_html5_backend_1.HTML5Backend, children: (0, jsx_runtime_1.jsx)(widget_provider_1.WidgetProvider, { widgets: widgets, children: (0, jsx_runtime_1.jsx)(store_provider_1.StoreProvider, { automata: data, children: (0, jsx_runtime_1.jsx)(state_provider_1.StateProvider, { children: (0, jsx_runtime_1.jsx)(material_provider_1.MaterialProvider, { children: (0, jsx_runtime_1.jsxs)(layout_1.Layout, { children: [(0, jsx_runtime_1.jsx)(layout_1.Sidebar, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)(header_1.Header, { loading: loading, onSave: onSave, onClose: onClose, onChange: onChange }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(tree_menu_1.TreeMenu, {}) })] }) }), (0, jsx_runtime_1.jsx)(layout_1.Workspace, { children: (0, jsx_runtime_1.jsx)(variable_provider_1.VariableProvider, { children: (0, jsx_runtime_1.jsx)(setting_engine_1.SettingEngine, { i18n: i18n }) }) })] }) }) }) }) }) }));
};
exports.NoCode = NoCode;
