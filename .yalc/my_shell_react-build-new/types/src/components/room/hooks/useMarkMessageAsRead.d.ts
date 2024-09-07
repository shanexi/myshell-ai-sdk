export default function useMarkMessageAsRead(id: string): {
    markMessageAsRead: () => Promise<boolean>;
};
