interface IAudioInput {
    onStart: () => void;
    disabled?: boolean;
}
export declare function AudioInput({ onStart, disabled }: IAudioInput): import("react/jsx-runtime").JSX.Element;
export {};
