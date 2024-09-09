import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState, useRef } from 'react';
import { getRedeemableSeasonList } from '../../apis/task.js';
import { useTaskStore } from '../../services/store/index.js';
dayjs.extend(duration);
export default function useSeason() {
    const [seasons] = useTaskStore(state => [state.seasons]);
    const seasonIndex = useTaskStore(state => state.seasonIndex);
    const seasonId = useTaskStore(state => state.seasonId);
    const seasonName = useTaskStore(state => state.seasonName);
    const isBate = useTaskStore(state => state.isBeta);
    const seasonBanners = useTaskStore(state => state.seasonBanners);
    const seasonStartDate = useTaskStore(state => state.seasonStartDate);
    const seasonEndDate = useTaskStore(state => state.seasonEndDate);
    const claimableStartDate = useTaskStore(state => state.claimableStartDate);
    const claimableEndDate = useTaskStore(state => state.claimableEndDate);
    const silentPeriodEndDate = useTaskStore(state => state.silentPeriodEndDate);
    const setSeasons = useTaskStore(state => state.setSeasons);
    const setSeasonIndex = useTaskStore(state => state.setSeasonIndex);
    const [isInClaimablePeriod, setIsInClaimablePeriod] = useState(false);
    const [isInSilentPeriod, setIsInSilentPeriod] = useState(false);
    const [isInSeasonPeriod, setIsInSeasonPeriod] = useState(false);
    const prevData = useRef({
        isInClaimablePeriod,
        isInSilentPeriod,
        isInSeasonPeriod,
    });
    const querySeasons = async () => {
        try {
            const { data, success } = await getRedeemableSeasonList();
            const [season, lastSeason] = data;
            if (success) {
                setSeasons(season, lastSeason);
            }
        }
        catch (e) {
        }
    };
    useEffect(() => {
        const cb = () => {
            try {
                const currentTime = dayjs();
                const newIsInClaimablePeriod = currentTime.isAfter(claimableStartDate) && currentTime.isBefore(claimableEndDate);
                const newIsInSeasonPeriod = currentTime.isAfter(seasonStartDate) && currentTime.isBefore(seasonEndDate);
                const newIsInSilentPeriod = currentTime.isAfter(seasonEndDate) && currentTime.isBefore(silentPeriodEndDate);
                if (prevData.current.isInClaimablePeriod !== newIsInClaimablePeriod) {
                    prevData.current.isInClaimablePeriod = newIsInClaimablePeriod;
                    setIsInClaimablePeriod(newIsInClaimablePeriod);
                }
                if (prevData.current.isInSilentPeriod !== newIsInSilentPeriod) {
                    prevData.current.isInSilentPeriod = newIsInSilentPeriod;
                    setIsInSilentPeriod(newIsInSilentPeriod);
                }
                if (prevData.current.isInSeasonPeriod !== newIsInSeasonPeriod) {
                    prevData.current.isInSeasonPeriod = newIsInSeasonPeriod;
                    setIsInSeasonPeriod(newIsInSeasonPeriod);
                }
            }
            catch (e) {
                console.log(e);
            }
        };
        cb();
        const interval = setInterval(cb, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [seasonStartDate, seasonEndDate, claimableStartDate, claimableEndDate, silentPeriodEndDate]);
    return {
        seasonId,
        seasonName,
        isBate,
        seasonBanners,
        seasons,
        seasonIndex,
        isInSilentPeriod,
        isInClaimablePeriod,
        isInSeasonPeriod,
        seasonStartDate,
        seasonEndDate,
        claimableEndDate,
        claimableStartDate,
        silentPeriodEndDate,
        querySeasons,
        setSeasonIndex,
    };
}
