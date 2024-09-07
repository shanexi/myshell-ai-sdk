interface AudioPlayerProps {
    replyUid: string;
    id: string;
    src?: string;
    direction?: 'right' | 'left';
    showBottomBorder?: boolean;
    isFromHistory?: boolean;
    borderColor?: string;
    themeColor?: string;
    blobDuration?: number;
    autoPlay?: boolean;
    showProgressBar: boolean;
}
declare function AudioPlayer(props: AudioPlayerProps): import("react/jsx-runtime").JSX.Element;
export default AudioPlayer;
