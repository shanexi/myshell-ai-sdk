import { identityService } from '../../common/services/identityService.js';
export default function CfMitigatedHandler(value) {
    if (value === 'challenge') {
        const currentHref = window.location.href;
        const userId = identityService.getUserId();
        const visitorId = identityService.getRandomVisitorId();
        const userIdentity = userId ? `userId=${userId}` : `visitorId=${visitorId}`;
        const targetHref = `${window.location.origin}/cf-captcha?originHref=${currentHref}&${userIdentity}`;
        window.location.href = targetHref;
    }
}
