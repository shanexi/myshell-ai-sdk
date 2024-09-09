import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PlayIcon from '@heroicons/react/24/solid/PlayIcon';
import { useContext } from 'react';
import { MessageContext } from '../../../../../../../../chat-new/context/MessageContext.js';
import { StaticContext } from '../../../../../../../../chat-new/context/StaticContext.js';
import { IconButton } from '../../../../../../../../common/components/ui/icon-button.js';
import { durationFormatter } from '../../../../../../../../common/utils/common-helper.js';
import { useDisplayContext } from '../../../../display-provider/index.js';
import useRegenerate from '../hooks/useRegenerate.js';
export default function RegenPlaceholder() {
    const { type, entityInfo, setEnergyInfo } = useContext(StaticContext);
    const { partialUpdateMessage, enQueue } = useContext(MessageContext);
    const { id } = entityInfo;
    const { message } = useDisplayContext();
    const { generating, handleRegenerate } = useRegenerate(type, id, partialUpdateMessage, enQueue, setEnergyInfo);
    const onRegenerate = () => {
        handleRegenerate(message?.id);
    };
    return (_jsxs("div", { className: "flex flex-col space-y-1 w-full overflow-hidden", children: [_jsx("div", { className: "bg-primary h-px w-0 items-start" }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(IconButton, { className: "w-6 h-6", onClick: onRegenerate, loading: generating, children: _jsx(PlayIcon, { className: "size-3 ml-0.5" }) }), _jsx("div", { className: "flex flex-col grow overflow-hidden", children: _jsx("div", { className: "text-sm text-brand truncate", children: durationFormatter(0) }) })] })] }));
}
