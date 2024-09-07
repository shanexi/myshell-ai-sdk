import 'driver.js/dist/driver.css';
export type ActiveType = 'chat' | 'setting' | 'create';
export default function TopBar({ botId, active, onBack }: {
    botId?: string;
    active?: ActiveType;
    onBack?: () => void;
}): import("react/jsx-runtime").JSX.Element;
