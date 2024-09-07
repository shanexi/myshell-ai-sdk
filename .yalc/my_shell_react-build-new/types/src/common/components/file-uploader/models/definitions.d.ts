export declare enum FileStatus {
    Uploading = "Uploading",
    Error = "Error",
    Uploaded = "Uploaded"
}
export type FileWithId = {
    file: File;
    id: string;
};
export type FileInfo = {
    resourceUrl?: string;
    resourceKey?: string;
    file?: FileWithId;
    status: FileStatus;
};
