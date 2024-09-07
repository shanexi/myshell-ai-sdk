export declare function useSensors(): {
    track: (eventName: string, eventProps?: any) => void;
    setOnceProfile: (props: any) => void;
    setProfile: (props: any) => void;
    login: (userId: string) => void;
};
