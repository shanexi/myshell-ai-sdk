export declare const TTS_EXAMPLE_DEFAULT_TEXT_MAP: {
    [key: number]: string;
};
export declare const TTS_SUCCESS_EXAMPLE_DEFAULT_TEXT_MAP: {
    [key: number]: string;
};
export declare const ChartColorSet: string[];
export declare const TASK_IMAGE_MAP: {
    [key: string]: string;
};
export declare const VoiceCallEnerygyUsedPerSecond = 5;
export declare const levelBatteryBenefitsMap: Array<{
    level: number;
    energy: number;
    basic: number;
    benefits?: string;
}>;
export declare const CaptchaTriggerMap: Record<string, string>;
export declare const MYSHELL_CREATOR_PASS_CONTRACT_ADDRESS = "0x63F94E1346c35e1aA2D535f094EB6bEF4A57256c";
export declare const MYSOUL_NFT_CONTRACT_ADDRESS = "0x1cB1ff4B1f1cca377807296C15705b786526EFEc";
export declare const SHELL_TOKEN_ADDRESS = "0xd243F69FfcdBfa9Eb6d280e5425FFB9bcFFD25B5";
export declare const GAS_LIMIT_ECONOMY = 100000;
export declare const GAS_LIMIT_LOW = 180000;
export declare const GAS_LIMIT_MEDIUM = 300000;
export declare const GAS_LIMIT_HIGH = 1000000;
export declare const MYSHELL_EXPLORER_URL = "https://myshell-testnet-explorer.alt.technology";
export declare const transferableTokens: string[];
export declare const BSC_EXPLORER_URL: string | undefined;
export declare const BADGE_CONTRACT_MAP: Record<string, `0x${string}`>;
export declare const bsc_chain_id_current_env: 56 | 97;
export declare const BADGE_VIEW_CONTRACT_MAP: Record<string, `0x${string}`>;
export declare enum SupportedChain {
    Ethereum = "Ethereum",
    BSC = "BSC",
    OpBNB = "opBNB",
    MyShell_Mainnet = "MyShell Mainnet",
    MyShell_Testnet = "MyShell Testnet",
    Base = "Base"
}
export declare const chainMap: {
    1: SupportedChain;
    56: SupportedChain;
    97: SupportedChain;
    204: SupportedChain;
};
export declare const chainIdMap: {
    Ethereum: 1;
    BSC: 56 | 97;
    opBNB: 204;
    "MyShell Testnet": number;
};
export declare const nativeTokenMap: {
    Ethereum: string;
    BSC: string;
    opBNB: string;
    "MyShell Mainnet": string;
    "MyShell Testnet": string;
};
export declare const iconMap: {
    Ethereum: string;
    BSC: string;
    opBNB: string;
    "MyShell Mainnet": string;
    "MyShell Testnet": string;
    Base: string;
};
