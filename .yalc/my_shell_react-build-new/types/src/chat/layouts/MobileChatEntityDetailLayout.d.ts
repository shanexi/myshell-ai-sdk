import { ReactNode } from 'react';
type P = {
    mobileTopActions?: ReactNode;
    chat: ReactNode;
    entityDetail: ReactNode;
    showInnerMobileActions?: boolean;
};
export default function MobileChatEntityDetailLayout({ mobileTopActions, chat, entityDetail, showInnerMobileActions }: P): import("react/jsx-runtime").JSX.Element;
export {};
