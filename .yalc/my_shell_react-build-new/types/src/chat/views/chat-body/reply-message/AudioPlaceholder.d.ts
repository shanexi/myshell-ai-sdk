interface AudioPlayerProps {
    blobDuration?: number;
    loading: boolean;
    onRegenerate: () => void;
    showProgressBar: boolean;
    showEnergyCost?: boolean;
    energyCost: number;
}
declare function AudioPlaceholder({ blobDuration, loading, onRegenerate, showProgressBar, showEnergyCost, energyCost }: AudioPlayerProps): import("react/jsx-runtime").JSX.Element;
export default AudioPlaceholder;
