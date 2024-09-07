import dayjs from 'dayjs';
export default function useSeason(): {
    seasonId: string | null;
    seasonName: string | null;
    isBate: boolean | null;
    seasonBanners: string[] | null;
    seasons: [import("../../common/constants/interfaces/task").SeasonInfo, import("../../common/constants/interfaces/task").SeasonInfo] | null;
    seasonIndex: number;
    isInSilentPeriod: boolean;
    isInClaimablePeriod: boolean;
    isInSeasonPeriod: boolean;
    seasonStartDate: dayjs.Dayjs | null;
    seasonEndDate: dayjs.Dayjs | null;
    claimableEndDate: dayjs.Dayjs | null;
    claimableStartDate: dayjs.Dayjs | null;
    silentPeriodEndDate: dayjs.Dayjs | null;
    querySeasons: () => Promise<void>;
    setSeasonIndex: (index: number) => void;
};
