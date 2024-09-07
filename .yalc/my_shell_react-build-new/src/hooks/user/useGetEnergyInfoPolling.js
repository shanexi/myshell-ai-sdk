"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const store_1 = require("../../services/store/index.js");
const useGetEnergyInfo_1 = __importDefault(require("./useGetEnergyInfo.js"));
const useGetEnergyInfoPolling = () => {
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const token = (0, store_1.useUserStore)(state => state.token);
    (0, react_1.useEffect)(() => {
        if (userId) {
            getEnergyInfo();
        }
        const intervalId = setInterval(() => {
            if (userId) {
                getEnergyInfo(!!token);
            }
        }, 5 * 60 * 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [token, userId]);
    return null;
};
exports.default = useGetEnergyInfoPolling;
