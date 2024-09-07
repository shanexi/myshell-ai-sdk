export default function useClaim(): {
    claimingAll: boolean;
    claimOne: (taskId: string, successCb?: () => void, errorCb?: () => void) => Promise<void>;
    claimAll: (successCb?: () => void) => Promise<void>;
};
