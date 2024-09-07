import React from 'react';
import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
declare function ChatBody({ id, botInfo, imgLoaded, bodyBgStyle, showInnerMobileActions }: {
    id: string;
    botInfo?: BotInfo | null;
    imgLoaded?: boolean;
    bodyBgStyle?: any;
    showInnerMobileActions?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof ChatBody>;
export default _default;
