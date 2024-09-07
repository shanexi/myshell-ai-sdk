"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGenerateTts;
const react_1 = require("react");
const api_1 = require("../../../chat/model/api.js");
const interfaces_1 = require("../../../chat/model/interfaces.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const store_1 = require("../../../services/store/index.js");
function useGenerateTts() {
    const [generating, setGenerating] = (0, react_1.useState)(false);
    const replaceRegeneratedVoice = (0, store_1.useChatStore)(state => state.replaceRegeneratedVoice);
    const pushAudioIdToQueue = (0, store_1.useChatStore)(state => state.pushAudioIdToQueue);
    const setEnergyInfo = (0, store_1.useUserStore)(state => state.setEnergyInfo);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const generateTts = async (msg, audioSpeed, cb) => {
        try {
            setGenerating(true);
            const { data } = await (0, api_1.regenerateTts)(msg.id.toString());
            const { voiceUrl, audioFileDurationSeconds, userEnergyInfo } = data;
            if (!(0, common_helper_1.isNullOrUndefined)(userEnergyInfo) && !isVisitor) {
                setEnergyInfo(userEnergyInfo);
            }
            replaceRegeneratedVoice(msg, voiceUrl, audioFileDurationSeconds, audioSpeed ? interfaces_1.AudioSpeedMap[audioSpeed] : 1);
            cb && cb();
            setTimeout(() => {
                pushAudioIdToQueue(msg.id);
            });
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setGenerating(false);
        }
    };
    return {
        generating,
        generateTts
    };
}
