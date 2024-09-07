import { MessageComponentsContainer } from '../../../../../../src/chat/model/interfaces.js';
interface P {
    row: MessageComponentsContainer;
    rowIndex: number;
    latest?: boolean;
    disabled?: boolean;
}
declare function Row({ row, rowIndex, latest, disabled }: P): import("react/jsx-runtime").JSX.Element;
export default Row;
