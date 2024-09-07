import { LLMModel } from '../../../../../../../../../src/common/constants/interfaces/bot.js';
type P = {
    model?: Pick<LLMModel, 'modelName' | 'iconUrl'>;
};
export default function ModelInfo({ model }: P): import("react/jsx-runtime").JSX.Element | null;
export {};
