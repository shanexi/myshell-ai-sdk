"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGenerateShareLink;
const react_use_1 = require("react-use");
const bot_1 = require("../../../../../../../apis/bot.js");
const workshop_1 = require("../../../../../../../apis/workshop.js");
const api_1 = require("../../../../../../../gallery/modal/api.js");
function useGenerateShareLink(type, id, botId) {
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
                apiFn = bot_1.getBotSharingCode;
                break;
            case 'widget':
                apiFn = workshop_1.getWidgetSharingCode;
                break;
            case 'gallery':
                apiFn = api_1.getGallerySharingCode;
                break;
            default:
                apiFn = bot_1.getBotSharingCode;
        }
        return apiFn;
    };
    const [generating, setGenerating] = (0, react_use_1.useToggle)(false);
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
