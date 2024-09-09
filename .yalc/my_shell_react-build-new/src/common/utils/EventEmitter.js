const EventEmitter = {
    events: {},
    dispatch(event, data) {
        if (!this.events[event]) {
            return;
        }
        this.events[event].forEach(callback => callback(data));
    },
    subscribe(event, callback, once) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        let cb = callback;
        if (once) {
            cb = data => {
                callback(data);
                this.unSubscribe(event);
            };
        }
        this.events[event].push(cb);
    },
    unSubscribe(event, callback) {
        if (!callback) {
            delete this.events[event];
            return;
        }
        if (!this.events[event]) {
            return;
        }
        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
};
export default EventEmitter;
