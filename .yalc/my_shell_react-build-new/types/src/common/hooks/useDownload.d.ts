declare function useDownload(): {
    downloading: boolean;
    onDownload: (filePath: string, fileName: string, successCb?: () => void) => Promise<void>;
};
export default useDownload;
