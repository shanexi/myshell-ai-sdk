import { bsc, bscTestnet, mainnet, opBNB } from 'viem/chains';
export const TTS_EXAMPLE_DEFAULT_TEXT_MAP = {
    1: `Now 9 language voices and instant English voice cloning are available! With just 20 seconds of English audio, you can simulate any voice you desire. Click 'Mine' to start cloning!`,
    2: `今、9種類の言語の音声とインスタント英語音声クローニングが利用可能です！20秒の英語音声だけで、あなたの望むどんな声もシミュレートできます。クローニングを開始するには、「Mine」をクリックしてください！`,
    3: `现已支持9种语言语音与快速英语语音克隆啦！只需20秒的英语音频，您就可以模拟任何您想要的声音。点击「我的」立刻开始克隆！`,
    4: `Maintenant, 9 voix de langage et une clonage instantané de la voix anglaise sont disponibles ! Avec seulement 20 secondes de son anglais, vous pouvez simuler n'importe quelle voix que vous désirez. Cliquez sur "Mine" pour commencer le clonage !`,
    5: `Теперь доступны 9 языковых голосов и мгновенное клонирование голоса на английском языке! Всего за 20 секунд английского аудио вы можете имитировать любой голос, который вы желаете. Нажмите «Mine», чтобы начать клонирование!`,
    6: `Agora, 9 vozes de idiomas e clonagem instantânea de voz em inglês estão disponíveis! Com apenas 20 segundos de áudio em inglês, você pode simular qualquer voz que desejar. Clique em "Mine" para começar a clonagem!`,
    7: `الآن متاحة 9 أصوات للغات واستنساخ صوت إنجليزي فوري! باستخدام 20 ثانية فقط من الصوت الإنجليزي ، يمكنك محاكاة أي صوت تريده. انقر على "Mine" لبدء الاستنساخ!`,
    8: `¡Ahora están disponibles 9 voces de lenguaje y clonación instantánea de voz en inglés! Con solo 20 segundos de audio en inglés, puede simular cualquier voz que desee. ¡Haga clic en "Mine" para comenzar la clonación!`,
    9: 'Jetzt stehen 9 Sprachstimmen und eine sofortige englische Sprachklonierung zur Verfügung! Mit nur 20 Sekunden englischem Audio können Sie jede gewünschte Stimme simulieren. Klicken Sie auf "Mine", um das Klonen zu starten!'
};
export const TTS_SUCCESS_EXAMPLE_DEFAULT_TEXT_MAP = {
    1: `How do you think about my voice?  If it doesn’t sound right to you, hit the report button and we will get our tech team on it.`,
    4: `Que pensez-vous de ma voix ? Si elle ne vous semble pas correcte, appuyez sur le bouton de signalement et notre équipe technique s'en occupera.`,
    8: `¿Qué opinas de mi voz? Si no te suena bien, presiona el botón de informe y nuestro equipo técnico lo revisará.`
};
export const ChartColorSet = [
    '#3548BE',
    '#DC9B2E',
    '#D4436D',
    '#D78329',
    '#5E23DC',
    '#548BDC',
    '#E1D336',
    '#3948C8',
    '#C034AA',
    '#8CCF35',
    '#DBBC31',
    '#382DCF',
    '#D04D1F',
    '#6CB930',
    '#76D3CC',
    '#D13CD7',
    '#BED636',
    '#EBEBEC',
    '#6CC591',
    '#D26022'
];
export const TASK_IMAGE_MAP = {
    SEASON_TASK_TYPE_DAILY_MESSAGE: '10',
    SEASON_TASK_TYPE_DC_INTERACTION: '05',
    SEASON_TASK_TYPE_BLOCKCHAIN_INTERACTION: '14',
    SEASON_TASK_TYPE_USE_VOICE_VIDEO: '15',
    SEASON_TASK_TYPE_CREATE_BOT: '13',
    SEASON_TASK_TYPE_USE_VOICE_CLONE: '08',
    SEASON_TASK_TYPE_USE_AUTO_PROMPT: '02',
    SEASON_TASK_TYPE_TALK_TO_GPT4_BOT: '12',
    SEASON_TASK_TYPE_TALK_TO_BOTS: '11',
    SEASON_TASK_TALK_TO_BOT_WITH_TAG: '06',
    SEASON_TASK_TYPE_BOT_MASTER: '03',
    SEASON_TASK_TYPE_MODEL_MASTER: '16',
    SEASON_TASK_TYPE_INVITEE_MESSAGE_LV1: '07',
    SEASON_TASK_TYPE_INVITEE_MESSAGE_LV2: '01',
    SEASON_TASK_TYPE_COMPENSATE: '17',
    SEASON_TASK_TYPE_FANS_KEY: '18'
};
export const VoiceCallEnerygyUsedPerSecond = 5;
export const levelBatteryBenefitsMap = [
    {
        level: 0,
        basic: 60,
        energy: 200,
        benefits: ''
    },
    {
        level: 1,
        basic: 61,
        energy: 202
    },
    {
        level: 2,
        basic: 62,
        energy: 204
    },
    {
        level: 3,
        basic: 63,
        energy: 206
    },
    {
        level: 4,
        basic: 64,
        energy: 208,
        benefits: 'one_more_private_bot'
    },
    {
        level: 5,
        basic: 65,
        energy: 210
    },
    {
        level: 6,
        basic: 66,
        energy: 212
    },
    {
        level: 7,
        basic: 67,
        energy: 214
    },
    {
        level: 8,
        basic: 68,
        energy: 216
    },
    {
        level: 9,
        basic: 69,
        energy: 218
    },
    {
        level: 10,
        basic: 70,
        energy: 220,
        benefits: 'one_more_private_bot'
    },
    {
        level: 11,
        basic: 71,
        energy: 223
    },
    {
        level: 12,
        basic: 72,
        energy: 226
    },
    {
        level: 13,
        basic: 73,
        energy: 229
    },
    {
        level: 14,
        basic: 74,
        energy: 232
    },
    {
        level: 15,
        basic: 75,
        energy: 235
    },
    {
        level: 16,
        basic: 76,
        energy: 238,
        benefits: 'one_more_private_bot'
    },
    {
        level: 17,
        basic: 77,
        energy: 241
    },
    {
        level: 18,
        basic: 78,
        energy: 244
    },
    {
        level: 19,
        basic: 79,
        energy: 247
    },
    {
        level: 20,
        basic: 80,
        energy: 250
    },
    {
        level: 21,
        basic: 81,
        energy: 254
    },
    {
        level: 22,
        basic: 82,
        energy: 258,
        benefits: ''
    },
    {
        level: 23,
        basic: 83,
        energy: 262
    },
    {
        level: 24,
        basic: 84,
        energy: 266
    },
    {
        level: 25,
        basic: 85,
        energy: 270,
        benefits: 'one_more_private_bot'
    },
    {
        level: 26,
        basic: 86,
        energy: 274
    },
    {
        level: 27,
        basic: 87,
        energy: 278
    },
    {
        level: 28,
        basic: 88,
        energy: 282
    },
    {
        level: 29,
        basic: 89,
        energy: 286
    },
    {
        level: 30,
        basic: 90,
        energy: 290
    },
    {
        level: 31,
        basic: 91,
        energy: 295,
        benefits: 'one_more_private_bot'
    },
    {
        level: 32,
        basic: 92,
        energy: 300
    },
    {
        level: 33,
        basic: 93,
        energy: 305
    },
    {
        level: 34,
        basic: 94,
        energy: 310
    },
    {
        level: 35,
        basic: 95,
        energy: 315
    },
    {
        level: 36,
        basic: 96,
        energy: 320
    },
    {
        level: 37,
        basic: 97,
        energy: 325
    },
    {
        level: 38,
        basic: 98,
        energy: 330
    },
    {
        level: 39,
        basic: 99,
        energy: 335
    },
    {
        level: 40,
        basic: 100,
        energy: 340
    },
    {
        level: 41,
        basic: 101,
        energy: 346
    },
    {
        level: 42,
        basic: 102,
        energy: 352
    },
    {
        level: 43,
        basic: 103,
        energy: 358
    },
    {
        level: 44,
        basic: 104,
        energy: 364,
        benefits: ''
    },
    {
        level: 45,
        basic: 105,
        energy: 370
    },
    {
        level: 46,
        basic: 106,
        energy: 376
    },
    {
        level: 47,
        basic: 107,
        energy: 382
    },
    {
        level: 48,
        basic: 108,
        energy: 398
    },
    {
        level: 49,
        basic: 109,
        energy: 394
    },
    {
        level: 50,
        basic: 110,
        energy: 400
    }
];
export const CaptchaTriggerMap = {
    '/v1/shell_coins/exchange_shell_coin_with_season_points': 'Redemption',
    '/v1/shell_coins/exchange_shell_coin_with_badges': 'Redemption',
    '/v1/season/task/claim': 'ClaimTask',
    '/v1/season/task/claim_all_last_season_points': 'ClaimTask',
    '/v1/season/task/claim_all': 'ClaimTask',
    '/v2/season/task/claim_all': 'ClaimTask',
    '/v1/bot/chat/send_message': 'SendMessage',
    '/v2/season/reward/redeem': 'Redemption',
    '/v1/season/reward/auto_redeem_and_use_season_pass_if_needed': 'ClaimPremiumCard'
};
export const MYSHELL_CREATOR_PASS_CONTRACT_ADDRESS = '0x63F94E1346c35e1aA2D535f094EB6bEF4A57256c';
export const MYSOUL_NFT_CONTRACT_ADDRESS = '0x1cB1ff4B1f1cca377807296C15705b786526EFEc';
export const SHELL_TOKEN_ADDRESS = '0xd243F69FfcdBfa9Eb6d280e5425FFB9bcFFD25B5';
export const GAS_LIMIT_ECONOMY = 100000;
export const GAS_LIMIT_LOW = 180000;
export const GAS_LIMIT_MEDIUM = 300000;
export const GAS_LIMIT_HIGH = 1000000;
export const MYSHELL_EXPLORER_URL = 'https://myshell-testnet-explorer.alt.technology';
export const transferableTokens = ['BNB', 'testETH', 'ETH'];
export const BSC_EXPLORER_URL = process.env.NEXT_PUBLIC_BSC_EXPLORE_URL;
export const BADGE_CONTRACT_MAP = {
    97: '0x6933332942c4c78C52DB9cC3da00b930597607B2',
    56: '0xEAAE3aC5d3E379a6f190A1d5F3B0F5Df4ec925df'
};
export const bsc_chain_id_current_env = process.env.NEXT_PUBLIC_ENV === 'production' ? bsc.id : bscTestnet.id;
export const BADGE_VIEW_CONTRACT_MAP = {
    97: '0x04916BCc5C7D074Ea4467baA84B5A17d4Cf07129',
    56: '0x35c8719109aa537d389d8130C283B33c37B1b91c'
};
export var SupportedChain;
(function (SupportedChain) {
    SupportedChain["Ethereum"] = "Ethereum";
    SupportedChain["BSC"] = "BSC";
    SupportedChain["OpBNB"] = "opBNB";
    SupportedChain["MyShell_Mainnet"] = "MyShell Mainnet";
    SupportedChain["MyShell_Testnet"] = "MyShell Testnet";
    SupportedChain["Base"] = "Base";
})(SupportedChain || (SupportedChain = {}));
export const chainMap = {
    [mainnet.id]: SupportedChain.Ethereum,
    [bsc.id]: SupportedChain.BSC,
    [bscTestnet.id]: SupportedChain.BSC,
    [opBNB.id]: SupportedChain.OpBNB
};
export const nativeTokenMap = {
    [SupportedChain.Ethereum]: 'ETH',
    [SupportedChain.BSC]: 'BNB',
    [SupportedChain.OpBNB]: 'BNB',
    [SupportedChain.MyShell_Mainnet]: 'ETH',
    [SupportedChain.MyShell_Testnet]: 'ETH'
};
export const iconMap = {
    [SupportedChain.Ethereum]: '/icons/reward-center/eth.svg',
    [SupportedChain.BSC]: '/icons/reward-center/bnb.svg',
    [SupportedChain.OpBNB]: '/icons/reward-center/bnb.svg',
    [SupportedChain.MyShell_Mainnet]: '/icons/reward-center/myshell_mainnet.svg',
    [SupportedChain.MyShell_Testnet]: '/icons/reward-center/myshell_mainnet.svg',
    [SupportedChain.Base]: '/icons/reward-center/base.svg'
};
