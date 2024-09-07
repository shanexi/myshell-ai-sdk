interface useGetGalleryProps {
    userId?: string;
    botId?: string;
}
export default function useGetGalleryList({ userId, botId }: useGetGalleryProps): {
    loading: boolean;
    hasMore: boolean;
    nextPageToken: string;
    fetchError: boolean;
    fetchEmpty: boolean;
    getGalleryData: (pageToken: string) => Promise<void>;
};
export {};
