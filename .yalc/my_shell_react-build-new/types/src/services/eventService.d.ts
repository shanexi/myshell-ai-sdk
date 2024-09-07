import { Subject } from 'rxjs';
declare class EventService {
    private socket;
    private disconnect$;
    userEnergyInfo$: Subject<number>;
    noEnoughEnergy$: Subject<void>;
    connectedInfo$: Subject<unknown>;
    ready(): boolean;
    disconnect(): void;
    connect(): Promise<void>;
    private onEnergyInfo;
    private onDiscordConnected;
    private onTwitterConnected;
}
export declare const eventService: EventService;
export {};
