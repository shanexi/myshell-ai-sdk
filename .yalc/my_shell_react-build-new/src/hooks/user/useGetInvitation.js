"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const rxjs_1 = require("rxjs");
const user_1 = require("../../apis/user.js");
const store_1 = require("../../services/store/index.js");
const useGetInvitation = () => {
    const setInviteLink = (0, store_1.useUserStore)(state => state.setInviteLink);
    const setUserInviteCode = (0, store_1.useUserStore)(state => state.setUserInviteCode);
    const setInvitationCount = (0, store_1.useUserStore)(state => state.setInvitationCount);
    const setValidInvitationCount = (0, store_1.useUserStore)(state => state.setValidInvitationCount);
    const setTgValidInvitationCount = (0, store_1.useUserStore)(state => state.setTgValidInvitationCount);
    const token = (0, store_1.useUserStore)(state => state.token);
    const destroy$ = (0, react_1.useMemo)(() => new rxjs_1.Subject(), []);
    const [invitationLoading, setInvitationLoading] = (0, react_1.useState)(false);
    const fetchGetInvitation = async () => {
        setInvitationLoading(true);
        const res = await (0, user_1.getInvitation)();
        if (res.success) {
            const { code, invitationCount, validInvitationCount, tgValidInvitationCount } = res.data;
            setInvitationCount(invitationCount);
            setValidInvitationCount(validInvitationCount);
            setTgValidInvitationCount(tgValidInvitationCount);
            setUserInviteCode(code);
            setInviteLink(`${window.location.origin}/invite/${code}`);
        }
        setInvitationLoading(false);
    };
    (0, react_1.useEffect)(() => {
        if (!token)
            return;
        fetchGetInvitation();
    }, [destroy$, token, setValidInvitationCount, setUserInviteCode, setInviteLink]);
    return {
        invitationLoading
    };
};
exports.default = useGetInvitation;
