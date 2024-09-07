import { MessageComponentsContainer } from '../../../../../../src/chat/model/interfaces.js';
interface P {
    rows: MessageComponentsContainer[];
    latest?: boolean;
    disabled?: boolean;
}
declare function Rows({ rows, latest, disabled }: P): import("react/jsx-runtime").JSX.Element;
export default Rows;
