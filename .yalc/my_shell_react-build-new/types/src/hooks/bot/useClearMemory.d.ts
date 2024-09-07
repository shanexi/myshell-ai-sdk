import { BotInfo } from '../../../../src/common/constants/interfaces/bot.js';
export default function useClearMemory(bot?: BotInfo | null, callback?: (isSuc: boolean) => void): () => void;
