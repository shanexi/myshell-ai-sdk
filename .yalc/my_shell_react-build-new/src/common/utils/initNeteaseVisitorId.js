"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNeteaseRequestToken = void 0;
const runtime_config_1 = require("./runtime-config.js");
const standaloneSensors_1 = __importDefault(require("../../lib/sensors/standaloneSensors.js"));
const sensors = new standaloneSensors_1.default();
const getNeteaseRequestToken = async () => {
    sensors?.track('ReadyForYiDunToken');
    const startAt = new Date().valueOf();
    try {
        const neg = createNEGuardian({ appId: runtime_config_1.NETEASE_ENGINE_APP_ID, timeout: 10000 });
        const { code, token } = await neg.getToken();
        const endAt = new Date().valueOf();
        const timeDiff = endAt - startAt;
        sensors?.track('ObtainYiDunToken', {
            result: code === 200 || code === 201,
            time_spent: timeDiff
        });
        if (code === 200 || code === 201) {
            return token;
        }
        else {
            throw new Error('getNeteaseEngineToken Error');
        }
    }
    catch (e) {
        const endAt = new Date().valueOf();
        const timeDiff = endAt - startAt;
        sensors?.track('ObtainYiDunToken', {
            result: false,
            time_spent: timeDiff
        });
        console.error(e);
        throw new Error('getNeteaseEngineToken Error');
    }
};
exports.getNeteaseRequestToken = getNeteaseRequestToken;
