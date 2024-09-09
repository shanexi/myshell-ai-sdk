import { useMemo, useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { getInvitation } from '../../apis/user.js';
import { useUserStore } from '../../services/store/index.js';
const useGetInvitation = () => {
    const setInviteLink = useUserStore(state => state.setInviteLink);
    const setUserInviteCode = useUserStore(state => state.setUserInviteCode);
    const setInvitationCount = useUserStore(state => state.setInvitationCount);
    const setValidInvitationCount = useUserStore(state => state.setValidInvitationCount);
    const setTgValidInvitationCount = useUserStore(state => state.setTgValidInvitationCount);
    const token = useUserStore(state => state.token);
    const destroy$ = useMemo(() => new Subject(), []);
    const [invitationLoading, setInvitationLoading] = useState(false);
    const fetchGetInvitation = async () => {
        setInvitationLoading(true);
        const res = await getInvitation();
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
    useEffect(() => {
        if (!token)
            return;
        fetchGetInvitation();
    }, [destroy$, token, setValidInvitationCount, setUserInviteCode, setInviteLink]);
    return {
        invitationLoading
    };
};
export default useGetInvitation;
