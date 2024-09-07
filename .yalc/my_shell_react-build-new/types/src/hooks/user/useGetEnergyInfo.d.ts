export default function useGetEnergyInfo(): {
    getEnergyInfo: (needSet?: boolean) => Promise<void>;
};
