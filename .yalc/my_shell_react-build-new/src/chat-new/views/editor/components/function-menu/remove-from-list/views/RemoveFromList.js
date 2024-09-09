import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import { StaticContext } from '../../../../../../../chat-new/context/StaticContext.js';
import { DropdownMenuItem } from '../../../../../../../common/components/ui/dropdown-menu.js';
import Spinner from '../../../../../../../common/components/ui/spinner.js';
import useRemoveFromList from '../hooks/useRemoveFromList.js';
export default function RemoveFromList({ type, id, disabled = false, onSuccess }) {
    const { getList } = useContext(StaticContext);
    const chatLocale = useTranslations('chat');
    const { removing, remove } = useRemoveFromList(type, id, getList);
    const onClick = async () => {
        try {
            await remove();
            onSuccess();
        }
        catch (e) {
            console.error(e);
        }
    };
    return (_jsxs(DropdownMenuItem, { disabled: disabled || removing, className: "cursor-pointer flex items-center gap-3 relative", onSelect: e => e.preventDefault(), onClick: onClick, children: [removing ? _jsx(Spinner, { size: "sm" }) : _jsx(XCircleIcon, { className: "size-5" }), chatLocale('remove_from_list')] }));
}
