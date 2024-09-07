import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
import { SelectedType } from '..';
interface P {
    selectedType?: SelectedType;
    selectedId?: string;
    botInfo: BotInfo;
}
export default function ListItem({ botInfo, selectedType, selectedId }: P): import("react/jsx-runtime").JSX.Element;
export {};
