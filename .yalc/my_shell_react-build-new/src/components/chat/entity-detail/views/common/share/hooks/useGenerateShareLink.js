import { useToggle } from 'react-use';
import { getBotSharingCode } from '../../../../../../../apis/bot.js';
import { getWidgetSharingCode } from '../../../../../../../apis/workshop.js';
import { getGallerySharingCode } from '../../../../../../../gallery/modal/api.js';
export default function useGenerateShareLink(type, id, botId) {
    const getApiFn = () => {
        let apiFn;
        switch (type) {
            case 'curve':
                apiFn = () => {
                    return Promise.resolve(id);
                };
                break;
            case 'bot':
            case 'ugc':
                apiFn = getBotSharingCode;
                break;
            case 'widget':
                apiFn = getWidgetSharingCode;
                break;
            case 'gallery':
                apiFn = getGallerySharingCode;
                break;
            default:
                apiFn = getBotSharingCode;
        }
        return apiFn;
    };
    const [generating, setGenerating] = useToggle(false);
    const generateShareLink = async () => {
        let shareUrl = '';
        try {
            setGenerating(true);
            const code = await getApiFn()(id);
            if (type === 'curve') {
                shareUrl = `${window.location.origin}/rewards-center/rewards-aipp-store/${code}`;
            }
            else if (type === 'widget') {
                if (code) {
                    shareUrl = `${window.location.origin}/widget/${code}`;
                }
                else {
                    shareUrl = `${window.location.origin}/robot-workshop/widget/${id}`;
                }
            }
            else if (type === 'gallery') {
                if (code) {
                    shareUrl = `${window.location.origin}/gallery/${botId}/${id}?code=${code}`;
                }
                else {
                    shareUrl = `${window.location.origin}/gallery/${botId}/${id}`;
                }
            }
            else {
                if (code) {
                    shareUrl = `${window.location.origin}/bot/${code}/${id}`;
                }
                else {
                    shareUrl = `${window.location.origin}/botshare/${id}`;
                }
            }
            return shareUrl;
        }
        catch (e) {
        }
        finally {
            setGenerating(false);
        }
    };
    return {
        generating,
        generateShareLink
    };
}
