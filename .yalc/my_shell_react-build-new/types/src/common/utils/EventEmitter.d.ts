type EventCallback = (data: any) => void;
interface EventRegistry {
    [event: string]: EventCallback[];
}
declare const EventEmitter: {
    events: EventRegistry;
    dispatch(event: string, data: any): void;
    subscribe(event: string, callback: EventCallback, once?: boolean): void;
    unSubscribe(event: string, callback?: EventCallback): void;
};
export default EventEmitter;
