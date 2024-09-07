type P = {
    disabled: boolean;
    onCreate: () => Promise<void>;
};
export default function Greeting({ disabled, onCreate }: P): import("react/jsx-runtime").JSX.Element;
export {};
