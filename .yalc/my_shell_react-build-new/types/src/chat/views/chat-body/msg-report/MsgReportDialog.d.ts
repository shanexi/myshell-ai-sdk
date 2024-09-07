import { ReactElement } from 'react';
export declare const MsgReportDialog: import("react").ForwardRefExoticComponent<{
    children?: ReactElement;
    onConfirm: ({ issues, othersDetail }: {
        issues: Record<string, boolean>;
        othersDetail: string;
    }) => void;
    type?: string;
    handleClose?: () => void;
    removeDislike?: () => void;
} & import("react").RefAttributes<{}>>;
