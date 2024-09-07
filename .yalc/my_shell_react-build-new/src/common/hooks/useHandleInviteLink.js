"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHandleInviteLink = void 0;
const react_1 = require("react");
const identityService_1 = require("../../common/services/identityService.js");
const useHandleInviteLink = () => {
    (0, react_1.useEffect)(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const invite = searchParams?.get('invite');
        const channel = searchParams?.get('channel');
        const inviteCode = searchParams?.get('inviteCode');
        const nametag = searchParams?.get('nametag');
        const my_from = searchParams?.get('my_from');
        const instance = searchParams?.get('instance');
        const code = searchParams?.get('code');
        const host = window.location.host.includes('localhost:3000') ? 'app-test.myshell.ai' : window.location.host;
        if (invite === '1') {
            identityService_1.identityService.clearInvitationData();
            const isKol = !!channel;
            let url = isKol ? `https://${host}/invite/${channel}/${inviteCode}` : `https://${host}/invite/${inviteCode}`;
            if (my_from === '1') {
                url = `https://${host}/inviteCode/${inviteCode}`;
            }
            if (!channel && my_from !== '1') {
                identityService_1.identityService.setInviteCode(`${inviteCode}`);
            }
            if (code) {
                identityService_1.identityService.setInviteCode(`${code}`);
            }
            if (instance === 'web3') {
                identityService_1.identityService.setFromWeb3(`web3`);
            }
            identityService_1.identityService.setInviteInfo(url);
        }
        else if (invite && nametag) {
            identityService_1.identityService.setInviteInfo(`https://${host}/invite/${invite}`);
        }
    }, []);
};
exports.useHandleInviteLink = useHandleInviteLink;
