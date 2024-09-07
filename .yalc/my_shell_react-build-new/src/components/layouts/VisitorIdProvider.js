"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VisitorIdProvider;
const react_1 = require("react");
const react_use_1 = require("react-use");
const identityService_1 = require("../../common/services/identityService.js");
const common_helper_1 = require("../../common/utils/common-helper.js");
function VisitorIdProvider({ children }) {
    const randomVisitorId = ((0, common_helper_1.isClient)() && identityService_1.identityService.getRandomVisitorId()) ?? '';
    const [visitorId, setVisitorId] = (0, react_1.useState)(randomVisitorId);
    (0, react_use_1.useEffectOnce)(() => {
        if (!visitorId) {
            const newVisitorId = (0, common_helper_1.generateUUID)();
            setVisitorId(newVisitorId);
            identityService_1.identityService.setRandomVisitorId(newVisitorId);
        }
    });
    if (!visitorId)
        return null;
    return children;
}
