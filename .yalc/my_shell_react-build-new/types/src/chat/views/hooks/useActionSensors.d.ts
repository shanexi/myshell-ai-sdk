export declare enum ActionType {
    Like = "Like",
    Dislike = "Dislike",
    Copy_Message = "Copy Message",
    Stop_Generating = "Stop Generating",
    Regenerate = "Regenerate",
    Edit = "Edit",
    Translate = "Translate",
    Download_Voice = "Download Voice",
    Share = "Share",
    Delete = "Delete",
    Remove_Like = "Remove Like",
    Remove_Dislike = "Remove Dislike",
    Regenerate_Voice = "Regenerate Voice",
    Feedback = "Feedback"
}
export default function useActionSensors(): {
    onSendActionSensors: (action_type: ActionType, other?: any) => void;
};
