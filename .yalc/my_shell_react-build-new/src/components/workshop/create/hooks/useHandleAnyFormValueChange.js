"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHandleAnyFormValueChange = void 0;
const react_1 = require("react");
const FormChangeContext_1 = require("../../../../components/workshop/create/context/FormChangeContext.js");
const useHandleAnyFormValueChange = () => {
    return (0, react_1.useContext)(FormChangeContext_1.FormChangeContext);
};
exports.useHandleAnyFormValueChange = useHandleAnyFormValueChange;
