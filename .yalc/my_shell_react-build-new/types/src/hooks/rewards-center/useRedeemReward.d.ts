export default function useRedeemReward(): {
    acting: boolean;
    redeem: (id: string, count: number) => Promise<import("../../core/request/APIFetch").ResponseType<{}>>;
};
