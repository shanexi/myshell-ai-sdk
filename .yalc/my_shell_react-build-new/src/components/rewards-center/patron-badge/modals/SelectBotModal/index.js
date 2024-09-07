"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SelectBotModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const outline_1 = require("@heroicons/react/24/outline");
const ArrowRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowRightIcon"));
const MagnifyingGlassIcon_1 = __importDefault(require("@heroicons/react/24/outline/MagnifyingGlassIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const agentPump_1 = require("../../../../../apis/agentPump.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const icon_1 = require("../../../../../common/components/ui/icon.js");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const spinner_1 = __importDefault(require("../../../../../common/components/ui/spinner.js"));
const typography_1 = require("../../../../../common/components/ui/typography.js");
const identityService_1 = require("../../../../../common/services/identityService.js");
const UserBotList_1 = __importDefault(require("../../../../../components/profile/UserBotList.js"));
function SelectBotModal(props) {
    const { open, onOpenChange, onBotConfirmed } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const tCommon = (0, next_intl_1.useTranslations)('common');
    const tWorkshop = (0, next_intl_1.useTranslations)('workshop');
    const userId = identityService_1.identityService.getUserId();
    const [bots, setBots] = (0, react_1.useState)([]);
    const [selectedBot, setSelectedBot] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const fetchBots = (0, react_1.useCallback)(async () => {
        if (!userId)
            return;
        try {
            setLoading(true);
            const response = await (0, agentPump_1.getLaunchInfo)(true);
            if (response.success) {
                const { botsCanLaunch } = response.data;
                setBots(botsCanLaunch);
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }, [userId]);
    (0, react_1.useEffect)(() => {
        fetchBots().then();
    }, [fetchBots]);
    const handleConfirm = (0, react_1.useCallback)(async () => {
        if (!selectedBot) {
            return;
        }
        onBotConfirmed?.(selectedBot.id);
    }, [onBotConfirmed, selectedBot]);
    const handleBotClick = (bot) => {
        setSelectedBot(bot);
    };
    const handleCreateBot = () => {
        window.open('/robot-workshop/create', '_blank');
    };
    return ((0, jsx_runtime_1.jsxs)(modal_1.Modal, { size: "sm", open: open, onOpenChange: onOpenChange, modalOnly: false, overlayClose: false, children: [(0, jsx_runtime_1.jsx)(modal_1.ModalHeader, { className: "border-b", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start pr-12", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", children: t('launch_agent') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: "subtle", children: t('launch_agent_desc') })] }) }), (0, jsx_runtime_1.jsxs)(modal_1.ModalBody, { className: "overflow-auto", children: [(!bots?.length || loading) && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-[392px] pt-[100px] px-4 py-3", children: [loading && ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand" }) })), !loading && ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "4xl", color: "subtlest", component: MagnifyingGlassIcon_1.default }), (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", className: "mt-3", children: t('launch_agent_nothing_found') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: "subtle", className: "mt-1.5", children: t('launch_agent_nothing_found_desc') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", className: "mt-6", onClick: handleCreateBot, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row gap-1.5 justify-around items-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", className: "text-inverse", children: tWorkshop('create_robot') }), (0, jsx_runtime_1.jsx)(icon_1.Icon, { color: "inverse", component: ArrowRightIcon_1.default })] }) })] }))] })), !loading && !!bots?.length && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full max-h-[510px] md:h-[392px] flex flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "grow-0 shrink-0 pb-3 px-4", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full", variant: "outline", color: "default", onClick: handleCreateBot, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row gap-1.5 justify-between items-center", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: outline_1.PlusIcon, color: "brand" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", color: "brand", children: tWorkshop('create_robot') })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 overflow-auto px-4 md:px-1.5", children: (0, jsx_runtime_1.jsx)(UserBotList_1.default, { containerClassName: "gap-y-0 md:grid-cols-1", bots: bots.map(({ summary }) => summary).filter(bot => !!bot) || [], onClose: () => { }, loading: loading, disableJumpToChat: true, onBotClick: (bot) => {
                                        handleBotClick(bot);
                                    }, selectedBotId: selectedBot?.id, itemDividerClassName: "mt-0" }) }), (0, jsx_runtime_1.jsx)("div", { className: "grow-0 shrink-0 pt-4 pb-1 px-4 border-t", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full", disabled: !selectedBot, loading: loading, onClick: handleConfirm, children: tCommon('confirm') }) })] }))] })] }));
}
