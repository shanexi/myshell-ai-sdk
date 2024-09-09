import { NETEASE_ENGINE_APP_ID } from './runtime-config.js';
import StandaloneSensors from '../../lib/sensors/standaloneSensors.js';
const sensors = new StandaloneSensors();
export const getNeteaseRequestToken = async () => {
    sensors?.track('ReadyForYiDunToken');
    const startAt = new Date().valueOf();
    try {
        const neg = createNEGuardian({ appId: NETEASE_ENGINE_APP_ID, timeout: 10000 });
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
