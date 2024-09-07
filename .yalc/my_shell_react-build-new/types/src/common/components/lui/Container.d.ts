import { MessageComponentsContainer } from '../../../../../src/chat/model/interfaces.js';
interface P {
    component: MessageComponentsContainer;
    latest?: boolean;
    disabled?: boolean;
}
declare function Container({ latest, component, disabled }: P): import("react/jsx-runtime").JSX.Element;
export default Container;
