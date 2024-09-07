"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetBotList;
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const rxjs_1 = require("rxjs");
const bot_1 = require("../../apis/bot.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const identityService_1 = require("../../common/services/identityService.js");
const useCalcGetChatListFn_1 = __importDefault(require("../../entity/hooks/useCalcGetChatListFn.js"));
const sensors_1 = require("../../lib/sensors/index.js");
const store_1 = require("../../services/store/index.js");
function useGetBotList(from, filterName) {
    const generateMultiBotMap = (0, store_1.useChatStore)(state => state.generateMultiBotMap);
    const setBotList = (0, store_1.useBotStore)(state => state.setBotList);
    const botList = (0, store_1.useBotStore)(state => state.botList);
    const getChatList = (0, useCalcGetChatListFn_1.default)('bot');
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const botListRef = (0, react_1.useRef)(botList.length);
    const [loading, setLoading] = (0, react_1.useState)(botListRef.current === 0);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const params = (0, navigation_1.useParams)();
    const sensors = (0, sensors_1.useSensors)();
    (0, react_1.useEffect)(() => {
        botListRef.current = botList.length;
    }, [botList]);
    (0, react_1.useEffect)(() => {
        if (isVisitor === 0) {
            return;
        }
        const searchParams = new URLSearchParams(window.location.search);
        const bot = searchParams.get('bot') || '';
        const invite = searchParams.get('invite') || '';
        const shareCode = searchParams.get('shareCode') || '';
        const channel = searchParams.get('channel') || '';
        const inviteCode = searchParams.get('inviteCode') || '';
        const botId = params.botId || '';
        const my_from = searchParams.get('my_from') || '';
        const from = searchParams.get('from') || '';
        const botIdFromPath = params?.botId;
        let cancel = false;
        const inviteWithBot = invite === '1' && !!botId;
        const isShareBot = bot === '1' || inviteWithBot;
        const isVisitorShare = !!botId && !channel && !shareCode;
        const isBotId = isVisitorShare || !!botIdFromPath;
        const requestCode = (isBotId ? botIdFromPath || botId : shareCode);
        const host = window.location.host.includes('localhost:3000') ? 'app-test.myshell.ai' : window.location.host;
        if (isShareBot) {
            identityService_1.identityService.clearInvitationData();
            if (inviteWithBot) {
                const url = `https://${host}/bot/${channel}/${inviteCode}/${botId}`;
                identityService_1.identityService.setInviteInfo(url);
            }
            else if (!isVisitorShare) {
                if (from === 'babel') {
                    identityService_1.identityService.setSharingBabelBotCode(shareCode);
                }
                else {
                    identityService_1.identityService.setSharingBotCode(shareCode);
                }
            }
            if (inviteWithBot) {
                identityService_1.identityService.setInviteCode(inviteCode);
            }
        }
        else if (invite === '1') {
            identityService_1.identityService.clearInvitationData();
            const isKol = !!channel;
            let url = isKol ? `https://${host}/invite/${channel}/${inviteCode}` : `https://${host}/invite/${inviteCode}`;
            if (my_from === '1') {
                url = `https://${host}/inviteCode/${inviteCode}`;
            }
            if (!channel && my_from !== '1') {
                identityService_1.identityService.setInviteCode(`${inviteCode}`);
            }
            identityService_1.identityService.setInviteInfo(url);
        }
        const queryBotList = async () => {
            if (botListRef.current === 0) {
                setLoading(true);
            }
            try {
                let shareBotDetail;
                if (isShareBot || !!botIdFromPath) {
                    shareBotDetail = await queryBot(isBotId, requestCode);
                }
                if (((isShareBot || !!botIdFromPath) && shareBotDetail) || botId) {
                    if (shareBotDetail && shareBotDetail.id) {
                        if (isShareBot) {
                            identityService_1.identityService.setSharingBotId(`${shareBotDetail.id}`);
                        }
                    }
                    const id = shareBotDetail?.id?.toString() || botId;
                    try {
                        const res = await (0, bot_1.addBotToChatList)(id);
                        if (res.success) {
                            const searchParams = new URLSearchParams(window.location.search);
                            const from = shareCode ? 'Bot Share Link' : searchParams.get('from') || 'Direct';
                            const botDetail = await queryBot(true, id);
                            sensors.track('AddBotToChatList', {
                                bot_id: id,
                                bot_name: botDetail?.name,
                                recommendation_spot: from
                            });
                        }
                    }
                    catch (error) {
                    }
                }
                try {
                    const res = await getChatList();
                    const isValidData = Array.isArray(res) && res.length;
                    if (isValidData) {
                        if (!isMobile && isValidData) {
                            if (!botId) {
                            }
                            else if (botId) {
                                const curBot = botList.filter((item) => String(item.id) === botId)[0];
                                if (curBot) {
                                }
                            }
                        }
                    }
                }
                catch (e) {
                    return;
                }
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };
        const queryBot = async (isBotId, requestCode) => {
            let res;
            try {
                if (isBotId) {
                    const infoRes = await (0, rxjs_1.lastValueFrom)((0, bot_1.getBotInfo)(`${requestCode}`));
                    res = {
                        id: infoRes?.bots?.[requestCode]?.summary?.id,
                        uid: infoRes?.bots?.[requestCode]?.summary?.uid,
                        name: infoRes?.bots?.[requestCode]?.summary?.name
                    };
                }
                else {
                    const infoRes = (await (0, bot_1.getBotSharedDetail)(requestCode));
                    res = {
                        id: infoRes?.data?.botSummary?.id
                    };
                }
            }
            catch (error) {
                console.error(error);
            }
            return res;
        };
        queryBotList();
        return () => {
            cancel = true;
        };
    }, [from, isVisitor, filterName]);
    return { loading };
}
