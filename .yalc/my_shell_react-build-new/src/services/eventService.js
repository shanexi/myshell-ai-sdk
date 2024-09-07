"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = void 0;
const rxjs_1 = require("rxjs");
const socket_io_client_1 = require("socket.io-client");
const interfaces_1 = require("../chat/model/interfaces.js");
const identityService_1 = require("../common/services/identityService.js");
const common_helper_1 = require("../common/utils/common-helper.js");
const rx_http_1 = require("../common/utils/rx-http.js");
const common_helper_2 = require("../common/utils/common-helper.js");
class EventService {
    socket;
    disconnect$ = new rxjs_1.Subject();
    userEnergyInfo$ = new rxjs_1.Subject();
    noEnoughEnergy$ = new rxjs_1.Subject();
    connectedInfo$ = new rxjs_1.Subject();
    ready() {
        return this.socket && this.socket.connected;
    }
    disconnect() {
        if (!this.ready()) {
            return;
        }
        this.socket?.disconnect();
    }
    async connect() {
        if (this.ready()) {
            return;
        }
        let visitorId;
        const randomVisitorId = ((0, common_helper_2.isClient)() && identityService_1.identityService.getRandomVisitorId()) ?? '';
        if (randomVisitorId) {
            visitorId = randomVisitorId;
        }
        else {
            visitorId = (0, common_helper_1.generateUUID)();
        }
        this.socket?.disconnect();
        this.socket = (0, socket_io_client_1.io)(`${rx_http_1.wsBaseURL}/chat`, {
            path: '/ws',
            transports: ['websocket'],
            auth: {
                token: identityService_1.identityService.getToken(),
                visitorId
            }
        });
        this.socket.on('connect_error', () => {
        });
        this.socket.on('disconnect', (reason) => {
            this.disconnect$.next(reason);
        });
        this.socket.on('connect', () => {
        });
        this.socket.on(interfaces_1.MsgEvents.ENERGY_INFO, this.onEnergyInfo);
        this.socket.on(interfaces_1.MsgEvents.CONNECTED_TO_DISCORD, this.onDiscordConnected);
        this.socket.on(interfaces_1.MsgEvents.CONNECTED_TO_TWITTER, this.onTwitterConnected);
    }
    onEnergyInfo = (msg) => {
        this.userEnergyInfo$.next(msg.data);
    };
    onDiscordConnected = (msg) => {
        this.connectedInfo$.next(msg.data);
    };
    onTwitterConnected = (msg) => {
        this.connectedInfo$.next(msg.data);
    };
}
exports.eventService = new EventService();
