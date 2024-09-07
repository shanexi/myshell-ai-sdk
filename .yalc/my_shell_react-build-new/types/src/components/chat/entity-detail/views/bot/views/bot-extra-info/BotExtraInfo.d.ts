import { LLMModel } from '../../../../../../../../../src/common/constants/interfaces/bot.js';
type P = {
    isOfficial?: boolean;
    logoUrl?: string;
    tgName?: string;
    model?: Pick<LLMModel, 'modelName' | 'iconUrl'>;
    githubUrl?: string;
};
export default function BotExtraInfo({ isOfficial, logoUrl, tgName, model, githubUrl }: P): import("react/jsx-runtime").JSX.Element;
export {};
