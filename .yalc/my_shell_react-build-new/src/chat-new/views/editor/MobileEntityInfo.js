import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon';
import { useContext } from 'react';
import { StaticContext } from '../../../chat-new/context/StaticContext.js';
import { Avatar } from '../../../common/components/ui/avatar.js';
export default function MobileEntityInfo({ showMobileDetail }) {
    const { entityInfo } = useContext(StaticContext);
    const { name, logoUrl } = entityInfo;
    return (_jsxs("div", { className: "flex items-center gap-[6px]", onClick: () => showMobileDetail?.(), children: [_jsx(Avatar, { src: logoUrl, size: "md", className: "shrink-0" }), _jsxs("div", { className: "flex gap-1 items-center", children: [_jsx("span", { className: "line-clamp-1 break-all", children: name }), _jsx(ChevronUpIcon, { className: "size-[18px] text-brand" })] })] }));
}
