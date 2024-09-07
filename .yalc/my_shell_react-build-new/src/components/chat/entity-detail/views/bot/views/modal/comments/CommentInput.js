"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommentInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const outline_1 = require("@heroicons/react/24/outline");
const LockClosedIcon_1 = __importDefault(require("@heroicons/react/24/outline/LockClosedIcon"));
const PaperAirplaneIcon_1 = __importDefault(require("@heroicons/react/24/solid/PaperAirplaneIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_textarea_autosize_1 = __importDefault(require("react-textarea-autosize"));
const agentPump_1 = require("../../../../../../../../apis/agentPump.js");
const common_1 = require("../../../../../../../../apis/common.js");
const FileDisplay_1 = __importDefault(require("../../../../../../../../chat/views/chat-body/replicate/FileDisplay.js"));
const useDropFiles_1 = require("../../../../../../../../chat/views/editor/useDropFiles.js");
const icon_1 = require("../../../../../../../../common/components/ui/icon.js");
const icon_button_1 = require("../../../../../../../../common/components/ui/icon-button.js");
const spinner_1 = __importDefault(require("../../../../../../../../common/components/ui/spinner.js"));
const typography_1 = require("../../../../../../../../common/components/ui/typography.js");
const useNotification_1 = require("../../../../../../../../common/hooks/useNotification.js");
const ChooseFileButton_1 = require("./ChooseFileButton.js");
function CommentInput(props) {
    const { enable, curveId, onCommentCreated, replyTo, onClearReplyTo, onReplyCreated } = props;
    const [text, setText] = (0, react_1.useState)('');
    const [file, setFile] = (0, react_1.useState)(undefined);
    const [creating, setCreating] = (0, react_1.useState)(false);
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const commmentT = (0, next_intl_1.useTranslations)('reward_center.comment_modal');
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const maxTextLength = 300;
    const { error } = (0, useNotification_1.useNotification)();
    const createContent = (0, react_1.useCallback)(async () => {
        if (creating || (!file && !text.trim()) || text.length > maxTextLength) {
            return;
        }
        try {
            setCreating(true);
            if (replyTo) {
                const res = file
                    ? await (0, agentPump_1.replyToCurveComment)({
                        commentId: replyTo.id,
                        content: text,
                        medias: [{ url: file.url, type: 'MEDIA_TYPE_IMAGE' }]
                    })
                    : await (0, agentPump_1.replyToCurveComment)({
                        commentId: replyTo.id,
                        content: text
                    });
                if (res.success) {
                    setText('');
                    setFile(undefined);
                    onReplyCreated?.(res.data.reply);
                }
                else {
                    error({
                        content: commmentT('comment_fail')
                    });
                }
            }
            else {
                const res = file
                    ? await (0, agentPump_1.createCurveComment)({
                        curveId,
                        content: text,
                        medias: [{ url: file.url, type: 'MEDIA_TYPE_IMAGE' }]
                    })
                    : await (0, agentPump_1.createCurveComment)({
                        curveId,
                        content: text
                    });
                if (res.success) {
                    setText('');
                    setFile(undefined);
                    onCommentCreated?.(res.data.comment);
                }
                else {
                    error({
                        content: commmentT('comment_fail')
                    });
                }
            }
        }
        catch (e) {
            error({
                content: commmentT('comment_fail')
            });
        }
        finally {
            setCreating(false);
        }
    }, [creating, curveId, onCommentCreated, onReplyCreated, replyTo, text, file]);
    const handleEnterPress = (0, react_1.useCallback)(e => {
        if (!e.target?.value) {
            return;
        }
        if (e.key === 'Enter') {
            if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
            }
            else {
                e.preventDefault();
                createContent().then();
            }
        }
    }, [createContent]);
    const uploadFiles = async (files, retry) => {
        for (const file of files) {
            setFile({
                ...file,
                status: 'pending'
            });
            const res = await (0, common_1.uploadFileToS3WithProgress)({
                scenario: common_1.Scenario.SCENARIO_CURVE_COMMENT,
                contentType: file.uiData.contentType,
                onProgress: value => {
                    setFile({
                        ...file,
                        status: 'pending'
                    });
                },
                file: file.file,
                cancelToken: (cancel) => {
                }
            });
            if (res.success) {
                setFile({
                    ...file,
                    status: res?.objectAccessUrl ? 'completed' : 'error',
                    url: res?.objectAccessUrl,
                    defaultUrl: res?.objectAccessUrl
                });
            }
            else {
                setFile({
                    status: 'error',
                    type: 'network'
                });
                error({
                    content: chatT('replicate.upload_network_tip')
                });
            }
        }
    };
    const onDelete = () => {
        setFile(undefined);
    };
    const onFileChange = (0, react_1.useCallback)(async (files) => {
        const res = await (0, useDropFiles_1.processUploadFiles)(curveId, files);
        uploadFiles(res);
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full bg-surface-hovered rounded-5xl", children: [enable && replyTo && ((0, jsx_runtime_1.jsx)("div", { className: "px-2 pt-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "px-3 py-2 bg-surface-default rounded-t-3xl rounded-bl-md flex flex-row items-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", className: "grow shrink", children: t('curve_comments.reply_to', { name: replyTo.userMini?.name }) }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", size: "sm", icon: outline_1.XMarkIcon, color: "default", className: "border-0 rounded-none shadow-none text-subtler", onClick: () => {
                                        onClearReplyTo?.();
                                    } })] }) })), !enable && ((0, jsx_runtime_1.jsx)("div", { className: "w-full py-2.5", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full min-h-9 flex flex-row justify-center items-center gap-1", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: LockClosedIcon_1.default }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", children: t('curve_comments.only_holders_can_comment') })] }) })), enable && ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex flex-row items-center px-3 py-2.5 gap-1.5", children: file && file?.status !== 'error' ? ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col", children: [(0, jsx_runtime_1.jsx)(react_textarea_autosize_1.default, { autoFocus: true, rows: 1, spellCheck: "false", maxLength: 500, value: text, onChange: e => setText(e.target.value), onKeyDown: handleEnterPress, disabled: creating, placeholder: t('curve_comments.input_placeholder'), className: "mb-3 grow shrink resize-none bg-surface-hovered text-sm placeholder:text-subtlest focus-visible:outline-none disabled:cursor-not-allowed disabled:placeholder:text-disabled overflow-auto max-h-[317px]" }), file?.status === 'pending' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-center w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 px-2 rounded-[8px] bg-surface-container-low mb-2 flex flex-col items-center justify-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", className: "text-brand" }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-on-surface text-[16px] leading-[1] font-medium", children: chatT('replicate.uploading') })] })) : file?.status === 'completed' ? ((0, jsx_runtime_1.jsx)("div", { className: "max-w-fit", children: (0, jsx_runtime_1.jsx)(FileDisplay_1.default, { data: file, onDelete: onDelete }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 grow-0 mt-3 w-full flex justify-between", children: [(0, jsx_runtime_1.jsx)(ChooseFileButton_1.ChooseFileButton, { botId: curveId, disabled: !!file, onFileChange: onFileChange, pending: file?.status === 'pending' }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", size: "md", color: "brand", className: "h-7.5 w-7.5", loading: creating, disabled: text.length > maxTextLength, onClick: createContent, children: (0, jsx_runtime_1.jsx)(PaperAirplaneIcon_1.default, { className: "w-4.5 h-4.5" }) })] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-row items-center", children: [(0, jsx_runtime_1.jsx)(ChooseFileButton_1.ChooseFileButton, { botId: curveId, disabled: !!file && file.status === 'completed', onFileChange: onFileChange }), (0, jsx_runtime_1.jsx)(react_textarea_autosize_1.default, { autoFocus: true, rows: 1, spellCheck: "false", maxLength: 500, value: text, onChange: e => setText(e.target.value), onKeyDown: handleEnterPress, disabled: creating, placeholder: t('curve_comments.input_placeholder'), className: "grow shrink resize-none bg-surface-hovered text-sm placeholder:text-subtlest focus-visible:outline-none disabled:cursor-not-allowed disabled:placeholder:text-disabled overflow-auto max-h-[317px] text-default" }), (0, jsx_runtime_1.jsx)("div", { className: "shrink-0 grow-0", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", size: "md", color: "brand", className: "h-7.5 w-7.5", loading: creating, disabled: !text.trim() || text.length > maxTextLength, onClick: createContent, children: (0, jsx_runtime_1.jsx)(PaperAirplaneIcon_1.default, { className: "w-4.5 h-4.5" }) }) })] })) }))] }), enable && text.length > maxTextLength && ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-center", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: "critical", children: t('curve_comments.max_input_length', { count: text.length, max: maxTextLength }) }) }))] }));
}
