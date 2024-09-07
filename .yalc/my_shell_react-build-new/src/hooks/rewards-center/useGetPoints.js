"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetPoints;
const task_1 = require("../../apis/task.js");
const user_1 = require("../../apis/user.js");
const store_1 = require("../../services/store/index.js");
const useUpdateUserProfile_1 = __importDefault(require("../user/useUpdateUserProfile.js"));
function useGetPoints() {
    const seasonPoints = (0, store_1.useTaskStore)(state => state.seasonPoints);
    const unclaimedPoints = (0, store_1.useTaskStore)(state => state.unclaimedPoints);
    const exchangePoints = (0, store_1.useTaskStore)(state => state.exchangePoints);
    const setExchangePoints = (0, store_1.useTaskStore)(state => state.setExchangePoints);
    const setUnclaimedPoints = (0, store_1.useTaskStore)(state => state.setUnclaimedPoints);
    const setPoints = (0, store_1.useTaskStore)(state => state.setPoints);
    const deductionPoints = (0, store_1.useTaskStore)(state => state.deductionPoints);
    const setDeductionPoints = (0, store_1.useTaskStore)(state => state.setDeductionPoints);
    const { queryUserProfile } = (0, useUpdateUserProfile_1.default)();
    const queryPoints = async () => {
        try {
            const { success, data } = await (0, user_1.fetchUserPoints)();
            if (success && data) {
                setPoints(data);
            }
            await queryUserProfile();
        }
        catch (e) {
            console.error(e);
        }
    };
    const queryUnclaimedPoints = async () => {
        try {
            const { success, data } = await (0, task_1.getLastSeasonInfo)();
            if (success) {
                setUnclaimedPoints(data.filter(({ point }) => point > 0));
            }
        }
        catch (e) {
        }
    };
    const queryDeductionPoints = async () => {
        try {
            const { success, data } = await (0, task_1.getDeductionInfo)();
            if (success) {
                setDeductionPoints(data);
            }
        }
        catch (e) {
        }
    };
    return {
        seasonPoints,
        unclaimedPoints,
        exchangePoints,
        deductionPoints,
        getPointRecords: user_1.getPointRecords,
        setUnclaimedPoints,
        setExchangePoints,
        setDeductionPoints,
        queryPoints,
        queryUnclaimedPoints,
        queryDeductionPoints
    };
}
