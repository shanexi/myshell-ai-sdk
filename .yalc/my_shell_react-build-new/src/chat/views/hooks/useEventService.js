"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventService = useEventService;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const rxjs_1 = require("rxjs");
const user_1 = require("../../../apis/user.js");
const user_2 = require("../../../common/constants/enums/user.js");
const eventService_1 = require("../../../services/eventService.js");
const store_1 = require("../../../services/store/index.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
function useEventService(isVisitor) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { warning } = (0, useNotification_1.useNotification)();
    const destroy$ = new rxjs_1.Subject();
    const setEnergyInfo = (0, store_1.useUserStore)(state => state.setEnergyInfo);
    const setSending = (0, store_1.useChatStore)(state => state.setSending);
    const setConnectedAccounts = (0, store_1.useUserStore)(state => state.setConnectedAccounts);
    (0, react_1.useEffect)(() => {
        if (isVisitor === user_2.VisitorEnum.INIT) {
            return;
        }
        eventService_1.eventService.connect();
        eventService_1.eventService.userEnergyInfo$.pipe((0, rxjs_1.takeUntil)(destroy$)).subscribe(ev => {
            setEnergyInfo({
                energy: ev || 0
            });
        });
        eventService_1.eventService.connectedInfo$.pipe((0, rxjs_1.takeUntil)(destroy$)).subscribe(() => {
            (0, user_1.getUserConnectedAccounts)().subscribe(res => {
                setConnectedAccounts(res);
            });
        });
        eventService_1.eventService.noEnoughEnergy$.pipe((0, rxjs_1.takeUntil)(destroy$)).subscribe(() => {
            warning({
                content: commonT('not_enough_energy'),
                id: 'not_enough_energy'
            });
            setSending(false);
        });
        return () => {
            destroy$.next();
            destroy$.complete();
            eventService_1.eventService.disconnect();
        };
    }, [isVisitor]);
}
