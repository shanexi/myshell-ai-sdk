import { useToggle } from 'react-use';
import { ttsRegen } from '../../../../../../../../apis/new-chat.js';
import { AudioSpeedMap } from '../../../../../../../../chat-new/model/constants.js';
export default function useRegenerate(type, id, partialUpdateMessage, enQueue, setEnergyInfo) {
    const [generating, setGenerating] = useToggle(false);
    const handleRegenerate = async (messageId) => {
        try {
            setGenerating(true);
            const { success, data, msg } = await ttsRegen(messageId);
            if (success) {
                const { audioUrl, audioSpeed, energyInfo, duration } = data;
                partialUpdateMessage?.(messageId, {
                    audioUrl,
                    audioSpeed: AudioSpeedMap[audioSpeed],
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
