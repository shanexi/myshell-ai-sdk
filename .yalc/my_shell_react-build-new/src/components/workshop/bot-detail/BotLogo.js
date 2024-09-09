import { jsx as _jsx } from "react/jsx-runtime";
import { Avatar } from '../../../common/components/ui/avatar.js';
export function BotLogo({ logoUrl }) {
    return (_jsx("div", { className: "flex-shrink-0 rounded-2xl w-[84px] h-[84px] md:w-[120px] md:h-[120px] overflow-hidden ml-[16px] md:ml-[24px] -mt-[30px] md:-mt-[48px] z-0 border-[2px] md:border-[6px] border-white dark:border-[#1C1E26]", children: logoUrl ? (_jsx(Avatar, { src: logoUrl, alt: "bot avatar", className: "w-full h-full" })) : (_jsx("div", { className: "w-full h-full rounded-md bg-[#bbb]" })) }));
}
