"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserShareBtn = UserShareBtn;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowUpOnSquareIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/ArrowUpOnSquareIcon"));
const react_1 = require("react");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner"));
const useCopyClipboard_1 = __importDefault(require("../../../../common/hooks/useCopyClipboard"));
const common_helper_1 = require("../../../../common/utils/common-helper");
const useGetInvitation_1 = __importDefault(require("../../../../hooks/user/useGetInvitation"));
const sensors_1 = require("../../../../lib/sensors");
const store_1 = require("../../../../services/store");
function UserShareBtn(props) {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [shareLink, setShareLink] = (0, react_1.useState)('');
    const { onCopy } = (0, useCopyClipboard_1.default)(shareLink);
    const sensors = (0, sensors_1.useSensors)();
    (0, useGetInvitation_1.default)();
    const inviteCode = (0, store_1.useUserStore)(state => state.inviteCode);
    const { userName, nameTag, userId } = props;
    const generateShareLink = () => {
        if (!userName)
            return;
        setLoading(true);
        let userShareUrl = '';
        if (nameTag) {
            userShareUrl = `${(0, common_helper_1.isClient)() ? window.location.origin : ''}/explore/profile/${encodeURIComponent(userName)}?nametag=${encodeURIComponent(nameTag)}${inviteCode && `&invite=${inviteCode}`}`;
            setShareLink(userShareUrl);
            onCopy(userShareUrl);
        }
        if (sensors && sensors.track) {
            sensors?.track('ShareItem', {
                item_type: 'creator',
                item_id: userId,
                item_name: userName
            });
        }
        setLoading(false);
    };
    return ((0, jsx_runtime_1.jsx)("button", { className: "bg-white rounded-full border border-[#E4E9F0] w-9 h-9 cursor-pointer shadow-button-basic flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed", onClick: generateShareLink, disabled: loading, children: !loading ? ((0, jsx_runtime_1.jsx)(ArrowUpOnSquareIcon_1.default, { className: "w-[20px] h-[22px] text-[#202223]" })) : ((0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", className: "text-brand" })) }));
}
