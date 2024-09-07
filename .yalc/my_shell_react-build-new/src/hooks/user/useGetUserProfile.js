"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const user_1 = require("../../apis/user.js");
const identityService_1 = require("../../common/services/identityService.js");
const sensors_1 = require("../../lib/sensors/index.js");
const store_1 = require("../../services/store/index.js");
const useGetUserProfile = () => {
    const setUser = (0, store_1.useUserStore)(state => state.setUser);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const setLoginPopVisible = (0, store_1.useChatStore)(state => state.setLoginPopVisible);
    const language = (0, store_1.useGlobalStore)(state => state.language);
    const sensors = (0, sensors_1.useSensors)();
    const getInfo = (0, react_1.useCallback)(async () => {
        try {
            const { data } = await (0, user_1.getUserProfile)();
            if (data) {
                setUser(data);
                if (data.source !== 'visitor') {
                    identityService_1.identityService.setUserId(`${data.id}`);
                    identityService_1.identityService.setUserPublicKey(data.publicKey);
                    identityService_1.identityService.setIsKol(data.isKol);
                    setLoginPopVisible(false);
                    sensors.login(`${data.id}`);
                    sensors.setOnceProfile({
                        register_time: data?.createdTime,
                        from_web3: identityService_1.identityService.getFromWeb3() === 'web3' ?? false
                    });
                    sensors.setProfile({
                        membership: data?.level,
                        ui_language: language,
                        user_type: data.source
                    });
                }
                else {
                    const needPopupDialog = identityService_1.identityService.getLoginPopup();
                    needPopupDialog && setLoginPopVisible(true);
                }
            }
        }
        catch (e) {
        }
    }, [setLoginPopVisible, setUser]);
    (0, react_1.useEffect)(() => {
        if (isVisitor !== 0) {
            getInfo();
        }
    }, [isVisitor]);
};
exports.default = useGetUserProfile;
