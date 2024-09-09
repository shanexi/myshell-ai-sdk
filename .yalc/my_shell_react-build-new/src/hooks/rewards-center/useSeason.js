"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useSeason;
const dayjs_1 = __importDefault(require("dayjs"));
const duration_1 = __importDefault(require("dayjs/plugin/duration"));
const react_1 = require("react");
const task_1 = require("../../apis/task.js");
const store_1 = require("../../services/store/index.js");
dayjs_1.default.extend(duration_1.default);
function useSeason() {
    const [seasons] = (0, store_1.useTaskStore)(state => [state.seasons]);
    const seasonIndex = (0, store_1.useTaskStore)(state => state.seasonIndex);
    const seasonId = (0, store_1.useTaskStore)(state => state.seasonId);
    const seasonName = (0, store_1.useTaskStore)(state => state.seasonName);
    const isBate = (0, store_1.useTaskStore)(state => state.isBeta);
    const seasonBanners = (0, store_1.useTaskStore)(state => state.seasonBanners);
    const seasonStartDate = (0, store_1.useTaskStore)(state => state.seasonStartDate);
    const seasonEndDate = (0, store_1.useTaskStore)(state => state.seasonEndDate);
    const claimableStartDate = (0, store_1.useTaskStore)(state => state.claimableStartDate);
    const claimableEndDate = (0, store_1.useTaskStore)(state => state.claimableEndDate);
    const silentPeriodEndDate = (0, store_1.useTaskStore)(state => state.silentPeriodEndDate);
    const setSeasons = (0, store_1.useTaskStore)(state => state.setSeasons);
    const setSeasonIndex = (0, store_1.useTaskStore)(state => state.setSeasonIndex);
    const [isInClaimablePeriod, setIsInClaimablePeriod] = (0, react_1.useState)(false);
    const [isInSilentPeriod, setIsInSilentPeriod] = (0, react_1.useState)(false);
    const [isInSeasonPeriod, setIsInSeasonPeriod] = (0, react_1.useState)(false);
    const prevData = (0, react_1.useRef)({
        isInClaimablePeriod,
        isInSilentPeriod,
        isInSeasonPeriod,
    });
    const querySeasons = async () => {
        try {
            const { data, success } = await (0, task_1.getRedeemableSeasonList)();
            const [season, lastSeason] = data;
            if (success) {
                setSeasons(season, lastSeason);
            }
        }
        catch (e) {
        }
    };
    (0, react_1.useEffect)(() => {
        const cb = () => {
            try {
                const currentTime = (0, dayjs_1.default)();
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
