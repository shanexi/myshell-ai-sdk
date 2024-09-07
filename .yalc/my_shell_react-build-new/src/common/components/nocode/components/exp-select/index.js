"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpSelect = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const select_1 = require("../../../../../common/components/ui/select.js");
const variable_provider_1 = require("../variable-provider/index.js");
function findVariable(scope, target) {
    let maxMatchingKey = '';
    let maxMatchingValue;
    for (let key in scope) {
        if (target.startsWith(key) && key.length > maxMatchingKey.length) {
            maxMatchingKey = key;
            maxMatchingValue = scope[key];
        }
    }
    return maxMatchingValue;
}
const ExpSelect = (props) => {
    const { name, onValueChange, value, ...rest } = props;
    const { scope = {} } = (0, variable_provider_1.useVariableContext)();
    const vars = findVariable(scope, name);
    const options = vars?.reduce((memo, cur) => {
        if (cur.variable && cur.name && memo) {
            memo.push({
                label: cur.variable,
                value: cur.name
            });
        }
        return memo;
    }, []) || [];
    return (0, jsx_runtime_1.jsx)(select_1.Select, { options: options, value: value, onValueChange: onValueChange, ...rest });
};
exports.ExpSelect = ExpSelect;
