"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useNeteaseEngineToken;
const runtime_config_1 = require("../../common/utils/runtime-config.js");
const sensors_1 = require("../../lib/sensors/index.js");
const store_1 = require("../../services/store/index.js");
function useNeteaseEngineToken() {
    const sensors = (0, sensors_1.useSensors)();
    const setNeteaseRequestToken = (0, store_1.useGlobalStore)(state => state.setNeteaseRequestToken);
    const getRequestNeteaseToken = async () => {
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
                setNeteaseRequestToken(token);
                return token;
            }
            else {
                throw new Error('get token failed');
            }
        }
        catch (e) {
            const endAt = new Date().valueOf();
            const timeDiff = endAt - startAt;
            sensors?.track('ObtainYiDunToken', {
                result: false,
                time_spent: timeDiff
            });
            throw new Error('get token failed');
        }
    };
    return {
        getRequestNeteaseToken
    };
}
