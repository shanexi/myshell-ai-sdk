"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const StaticContext_1 = require("../../../../../chat-new/context/StaticContext");
const energy_pack_1 = __importDefault(require("../../../../../chat-new/views/message-list/components/energy-pack"));
const passcard_1 = __importDefault(require("../../../../../chat-new/views/message-list/components/passcard"));
const store_1 = require("../../../../../services/store");
const Footer = () => {
    const user = (0, store_1.useUserStore)(state => state.user);
    const token = (0, store_1.useUserStore)(state => state.token);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const isBasicUser = isVisitor === 2 && user?.level === 1;
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const retriveEnergySuccess = (0, store_1.useUserStore)(state => state.retriveEnergySuccess);
    const { entityInfo } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const isEnoughEnergy = (0, react_1.useMemo)(() => {
        if (retriveEnergySuccess) {
            return energy >= (entityInfo.energyPerChat ?? 1);
        }
        return !retriveEnergySuccess;
    }, [retriveEnergySuccess, energy, entityInfo.energyPerChat]);
    const loginUserNoEnoughEnergy = !!token && !isEnoughEnergy;
    if (!loginUserNoEnoughEnergy) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)("div", { className: "pb-4 md:pb-6 px-0 md:px-[38px]", children: isBasicUser ? (0, jsx_runtime_1.jsx)(passcard_1.default, {}) : (0, jsx_runtime_1.jsx)(energy_pack_1.default, {}) });
};
exports.default = Footer;
