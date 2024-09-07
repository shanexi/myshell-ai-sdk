import { getCoinRecords } from '../../../../src/apis/user.js';
import { HoldBadge } from '../../../../src/common/constants/interfaces/task.js';
export default function useShellCoin(): {
    shellCoins: number | null;
    exchangePoints: import("../../../../src/common/constants/interfaces/task.js").ExchangePoint[];
    queryShellCoins: () => Promise<void>;
    queryExchange: () => Promise<void>;
    exchanging: boolean;
    exchange: () => Promise<import("../../core/request/APIFetch").ResponseType<import("../../../../src/common/constants/interfaces/task.js").Order> | {
        success: boolean;
    }>;
    badgeToCoinExchanging: boolean;
    badgeToCoin: (badges: HoldBadge[], onClose?: (count: number) => void) => Promise<void>;
    querying: boolean;
    getHoldBadges: () => Promise<void>;
    getCoinRecords: typeof getCoinRecords;
};
