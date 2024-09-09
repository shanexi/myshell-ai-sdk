"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CfMitigatedHandler;
const identityService_1 = require("../../common/services/identityService");
function CfMitigatedHandler(value) {
    if (value === 'challenge') {
        const currentHref = window.location.href;
        const userId = identityService_1.identityService.getUserId();
        const visitorId = identityService_1.identityService.getRandomVisitorId();
        const userIdentity = userId ? `userId=${userId}` : `visitorId=${visitorId}`;
        const targetHref = `${window.location.origin}/cf-captcha?originHref=${currentHref}&${userIdentity}`;
        window.location.href = targetHref;
    }
}
