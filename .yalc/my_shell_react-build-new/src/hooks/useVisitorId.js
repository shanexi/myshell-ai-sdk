"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const identityService_1 = require("../common/services/identityService.js");
const common_helper_1 = require("../common/utils/common-helper.js");
const useVisitorId = () => {
    const initVisitorId = () => {
        const visitorId = ((0, common_helper_1.isClient)() && identityService_1.identityService.getRandomVisitorId()) ?? '';
        if (!visitorId) {
            const generatedVisitorId = (0, common_helper_1.generateUUID)();
            identityService_1.identityService.setRandomVisitorId(generatedVisitorId);
        }
    };
    (0, react_1.useEffect)(() => {
        if (typeof window !== 'undefined') {
            initVisitorId();
        }
    }, []);
    return null;
};
exports.default = useVisitorId;
