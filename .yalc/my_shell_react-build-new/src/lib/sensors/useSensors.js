"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSensors = useSensors;
function useSensors() {
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
