export declare enum ReportIssueType {
    CREATE_VOICE = "create_voice",
    MSG_FEEDBACK = "msg_feedback",
    VOICE_CALL_FEEDBACK = "voice_call_feedback",
    DEDUCTION_APPEAL = "deduction_appeal",
    IMAGE_GEN_FEEDBACK = "image_gen_feedback"
}
export interface ReportIssueReqBody {
    type?: ReportIssueType;
    issueType?: ReportIssueType;
    entityId: string;
    content: string;
}
export interface ListResponse {
    hasMore: boolean;
    nextPageToken: string;
}
export interface ISideBarTabProps {
    icon: React.ElementType;
    text: string;
    href: string;
    mobileHref: string;
    key: string;
}
