"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useRegenerate;
const react_use_1 = require("react-use");
const new_chat_1 = require("../../../../../../../../apis/new-chat.js");
const constants_1 = require("../../../../../../../../chat-new/model/constants.js");
function useRegenerate(type, id, partialUpdateMessage, enQueue, setEnergyInfo) {
    const [generating, setGenerating] = (0, react_use_1.useToggle)(false);
    const handleRegenerate = async (messageId) => {
        try {
            setGenerating(true);
            const { success, data, msg } = await (0, new_chat_1.ttsRegen)(messageId);
            if (success) {
                const { audioUrl, audioSpeed, energyInfo, duration } = data;
                partialUpdateMessage?.(messageId, {
                    audioUrl,
                    audioSpeed: constants_1.AudioSpeedMap[audioSpeed],
                    duration
                });
                enQueue?.(messageId);
                setEnergyInfo?.(energyInfo);
            }
            else {
                console.error(msg);
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setGenerating(false);
        }
    };
    return {
        generating,
        handleRegenerate
    };
}
