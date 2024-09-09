export function useSensors() {
    return {
        track: (eventName, eventProps) => {
            window?.sensors?.track(eventName, {
                ...(eventProps || {})
            });
        },
        setOnceProfile: (props) => {
            window?.sensors.setOnceProfile({
                ...(props || {})
            });
        },
        setProfile: (props) => {
            window?.sensors.setProfile({
                ...(props || {})
            });
        },
        login: (userId) => {
            window?.sensors.login(userId);
        }
    };
}
