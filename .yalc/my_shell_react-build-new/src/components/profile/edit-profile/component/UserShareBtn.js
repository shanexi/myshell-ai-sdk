import { jsx as _jsx } from "react/jsx-runtime";
import ArrowUpOnSquareIcon from '@heroicons/react/24/outline/ArrowUpOnSquareIcon';
import { useState } from 'react';
import Spinner from '../../../../common/components/ui/spinner.js';
import useCopyClipboard from '../../../../common/hooks/useCopyClipboard.js';
import { isClient } from '../../../../common/utils/common-helper.js';
import useGetInvitation from '../../../../hooks/user/useGetInvitation.js';
import { useSensors } from '../../../../lib/sensors/index.js';
import { useUserStore } from '../../../../services/store/index.js';
export function UserShareBtn(props) {
    const [loading, setLoading] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const { onCopy } = useCopyClipboard(shareLink);
    const sensors = useSensors();
    useGetInvitation();
    const inviteCode = useUserStore(state => state.inviteCode);
    const { userName, nameTag, userId } = props;
    const generateShareLink = () => {
        if (!userName)
            return;
        setLoading(true);
        let userShareUrl = '';
        if (nameTag) {
            userShareUrl = `${isClient() ? window.location.origin : ''}/explore/profile/${encodeURIComponent(userName)}?nametag=${encodeURIComponent(nameTag)}${inviteCode && `&invite=${inviteCode}`}`;
            setShareLink(userShareUrl);
            onCopy(userShareUrl);
        }
        if (sensors && sensors.track) {
            sensors?.track('ShareItem', {
                item_type: 'creator',
                item_id: userId,
                item_name: userName
            });
        }
        setLoading(false);
    };
    return (_jsx("button", { className: "bg-white rounded-full border border-[#E4E9F0] w-9 h-9 cursor-pointer shadow-button-basic flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed", onClick: generateShareLink, disabled: loading, children: !loading ? (_jsx(ArrowUpOnSquareIcon, { className: "w-[20px] h-[22px] text-[#202223]" })) : (_jsx(Spinner, { size: "sm", className: "text-brand" })) }));
}
