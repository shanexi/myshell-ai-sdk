declare const useLoadConnectedAccounts: () => {
    loadConnectedAccounts: () => import("rxjs").Subscription;
    connectedAccounts: import("../../common/constants/interfaces/user").UserConnectedAccounts | null;
};
export default useLoadConnectedAccounts;
