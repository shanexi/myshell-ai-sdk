interface AudioPlayerProps {
    id: string;
    src?: string;
    direction?: 'right' | 'left';
    showBottomBorder?: boolean;
    borderColor?: string;
    themeColor?: string;
    showProgressBar?: boolean;
    blobDuration?: number;
}
declare function AudioPlayer(props: AudioPlayerProps): import("react/jsx-runtime").JSX.Element;
export default AudioPlayer;
