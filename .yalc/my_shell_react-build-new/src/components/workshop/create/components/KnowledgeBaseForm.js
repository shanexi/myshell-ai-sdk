"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const rxjs_1 = require("rxjs");
const knowledgebase_1 = require("../../../../apis/knowledgebase.js");
const DeleteIcon_svg_1 = __importDefault(require("@/common/assets/icons/DeleteIcon.svg"));
const UpdateIcon_svg_1 = __importDefault(require("@/common/assets/icons/UpdateIcon.svg"));
const button_1 = require("../../../../common/components/ui/button.js");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const bot_1 = require("../../../../common/constants/interfaces/bot.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const ImportLinkDialog_1 = require("../../../../components/workshop/ImportLinkDialog.js");
const useHandleAnyFormValueChange_1 = require("../../../../components/workshop/create/hooks/useHandleAnyFormValueChange.js");
const workshop_1 = require("../../../../services/store/workshop.js");
const stopViaSubject$ = new rxjs_1.Subject();
const stopPolling$ = (0, rxjs_1.timer)(60000);
function KnowledgeBaseForm({ botId, disable, onUpdateId, form, knowledgeList, setKnowledgeList, showLearnMore, isGuide, onSave }) {
    const [loading, setLoading] = (0, react_2.useState)(false);
    const t = (0, next_intl_1.useTranslations)('workshop');
    const knowledgeT = (0, next_intl_1.useTranslations)('workshop.create_bot.knowledge');
    const handleAnyFormValueChange = (0, useHandleAnyFormValueChange_1.useHandleAnyFormValueChange)();
    const currentForm = (0, workshop_1.useWorkshopStore)(state => state.currentForm);
    const setCurrentForm = (0, workshop_1.useWorkshopStore)(state => state.setCurrentForm);
    (0, react_2.useEffect)(() => {
        if (!botId)
            return;
        setLoading(true);
        const subscribe = (0, knowledgebase_1.getKnowledgeBaseList)(botId)
            .pipe((0, rxjs_1.finalize)(() => {
            setLoading(false);
        }))
            .subscribe({
            next: data => {
                setKnowledgeList(data);
            }
        });
        return () => {
            setLoading(false);
            subscribe.unsubscribe();
        };
    }, [botId]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-[24px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", id: "knowledge", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", children: knowledgeT('title') }), (0, jsx_runtime_1.jsx)(form.Field, { name: "knowledgeBase", children: field => ((0, jsx_runtime_1.jsx)(react_1.Switch, { name: field.name, size: "md", colorScheme: "brand", isChecked: field.getValue(), isDisabled: isGuide, ...field.getInputProps(), onChange: (e) => {
                                        if (!isGuide) {
                                            field.setValue(e.target.checked);
                                            handleAnyFormValueChange();
                                            setCurrentForm({ ...currentForm, knowledgeBase: e.target.checked });
                                        }
                                    } })) })] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-secondary text-sm mt-1.5", children: [knowledgeT('intro'), (0, jsx_runtime_1.jsx)("span", { className: "text-primary cursor-pointer px-1", onClick: () => {
                                    if (!isGuide) {
                                        showLearnMore('knowledge_leanr_more');
                                    }
                                }, children: t('learn_more') })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-5 bg-surface space-y-6 rounded-[20px] border-default border-[1px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2", id: "knowledgeImport", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", color: "var(--on-surface)", children: t('gitbook_urL') }), (0, jsx_runtime_1.jsxs)("abbr", { className: "text-secondary text-sm font-normal", children: [t('gitbook_urL_tip'), " "] }), (0, jsx_runtime_1.jsx)(LinkFetcher, { onSuccess: data => {
                                    setKnowledgeList(data);
                                }, botId: botId, disable: disable, form: form, onUpdateId: onUpdateId, isGuide: isGuide, list: knowledgeList, onSave: onSave })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-[10px]", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", color: "var(--on-surface)", children: t('knowledge_list') }), (0, jsx_runtime_1.jsx)("abbr", { className: "text-secondary text-sm font-normal", children: t('knowledge_list_tip') }), (0, jsx_runtime_1.jsxs)(react_1.TableContainer, { borderRadius: "12px", border: "1px solid var(--border)", children: [(0, jsx_runtime_1.jsxs)(react_1.Table, { variant: "unstyled", children: [(0, jsx_runtime_1.jsx)(react_1.Thead, { children: (0, jsx_runtime_1.jsxs)(react_1.Tr, { children: [(0, jsx_runtime_1.jsx)(react_1.Th, { textColor: "var(--secondary)", fontWeight: "normal", fontSize: 14, textTransform: "capitalize", border: "none", children: t('type') }), (0, jsx_runtime_1.jsx)(react_1.Th, { textColor: "var(--secondary)", fontWeight: "normal", fontSize: 14, textTransform: "capitalize", border: "none", children: t('url') }), (0, jsx_runtime_1.jsx)(react_1.Th, { textColor: "var(--secondary)", fontWeight: "normal", fontSize: 14, textTransform: "capitalize", border: "none", children: t('status') }), (0, jsx_runtime_1.jsx)(react_1.Th, { textColor: "var(--secondary)", fontWeight: "normal", fontSize: 14, textTransform: "capitalize", border: "none", children: t('operation') })] }) }), (0, jsx_runtime_1.jsx)(react_1.Tbody, { children: knowledgeList.map(res => ((0, jsx_runtime_1.jsxs)(react_1.Tr, { gap: "10px", children: [(0, jsx_runtime_1.jsx)(react_1.Td, { children: (0, jsx_runtime_1.jsx)(react_1.Text, { className: "text-sm", children: res.sourceType || 'url' }) }), (0, jsx_runtime_1.jsx)(react_1.Td, { maxW: "200px", children: (0, jsx_runtime_1.jsx)(react_1.Text, { className: "text-sm overflow-x-auto", children: res.source }) }), (0, jsx_runtime_1.jsx)(react_1.Td, { children: (0, jsx_runtime_1.jsx)("div", { className: "flex", children: (0, jsx_runtime_1.jsx)(StatusTag, { text: bot_1.KnowledgeSourceStatusEnum[res.status] }) }) }), (0, jsx_runtime_1.jsx)(react_1.Td, { className: "!px-0", children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(OperationGroup, { botId: botId, sourceUid: res.sourceUid, onSuccess: data => {
                                                                        setKnowledgeList(data);
                                                                    }, isGuide: isGuide }) }) })] }, res.source))) })] }), loading && ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-16 flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "md" }) }))] })] })] })] }));
}
function LinkFetcher({ botId, disable, onSuccess, form, onUpdateId, isGuide, list, onSave }) {
    const [loading, setLoading] = (0, react_2.useState)(false);
    const { warning } = (0, useNotification_1.useNotification)();
    const ref = (0, react_2.useRef)(null);
    const [url, setUrl] = (0, react_2.useState)('');
    const showDialog = () => {
        ref.current.show();
    };
    const commonT = (0, next_intl_1.useTranslations)('common');
    const requestT = (0, next_intl_1.useTranslations)('request');
    const t = (0, next_intl_1.useTranslations)('workshop');
    const startPolling = (0, react_2.useCallback)((botId, sourceUid) => {
        return (0, rxjs_1.timer)(5000, 5000)
            .pipe((0, rxjs_1.switchMap)(() => (0, knowledgebase_1.getKnowledgeBaseList)(botId)), (0, rxjs_1.takeUntil)((0, rxjs_1.merge)(stopPolling$, stopViaSubject$)), (0, rxjs_1.tap)(data => {
            if (data.some(source => source.sourceUid === sourceUid && source.status !== 2)) {
                stopViaSubject$.next();
                onSuccess(data);
            }
        }))
            .subscribe();
    }, [onSuccess]);
    const onImportLink = (0, react_2.useCallback)(async () => {
        if (loading)
            return;
        setLoading(true);
        try {
            (0, knowledgebase_1.importKnowledgeBaseByUrl)(botId, url)
                .pipe((0, rxjs_1.tap)(source => startPolling(botId, source.sourceUid)), (0, rxjs_1.switchMap)(() => {
                return (0, knowledgebase_1.getKnowledgeBaseList)(botId);
            }), (0, rxjs_1.finalize)(() => {
                setLoading(false);
            }))
                .subscribe({
                next: data => {
                    onSuccess(data);
                    setUrl('');
                },
                error: err => {
                    warning({ content: commonT('url_repeat') });
                }
            });
        }
        catch {
            warning({ content: commonT('url_repeat') });
        }
    }, [loading, botId, url, startPolling, onSuccess]);
    const onImportLinkClicked = (0, react_2.useCallback)(async () => {
        if (isGuide || !url)
            return;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            warning({ content: commonT('url_must_http_https') });
            return;
        }
        if (list?.length > 0 && list?.every((item) => item.source == url)) {
            warning({ content: commonT('url_repeat') });
            return;
        }
        if (botId) {
            onImportLink();
            return;
        }
        showDialog();
    }, [url, botId, warning, commonT, onImportLink]);
    const createBotThenImportLink = (0, react_2.useCallback)(async () => {
        if (botId) {
            setLoading(true);
            (0, knowledgebase_1.importKnowledgeBaseByUrl)(botId, url)
                .pipe((0, rxjs_1.tap)(source => startPolling(botId, source.sourceUid)), (0, rxjs_1.finalize)(() => {
                setLoading(false);
            }))
                .subscribe({
                next: () => {
                    onUpdateId(`${form.getFieldValue('botId')}`);
                }
            });
        }
        else {
            onSave();
        }
    }, [onUpdateId, startPolling, url]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "grow rounded-[12px] border border-default hover:border-hovered shadow flex justify-between items-center relative", children: (0, jsx_runtime_1.jsx)("input", { disabled: isGuide, value: url, className: "bg-transparent px-[12px] py-[8px] rounded-[12px] flex-1 disabled:cursor-not-allowed", placeholder: "https://www.example.com/", onChange: e => setUrl(e.target.value) }) }), (0, jsx_runtime_1.jsx)(ImportLinkDialog_1.ImportLinkDialog, { ref: ref, onConfirm: createBotThenImportLink, children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", variant: "primary", onClick: () => onImportLinkClicked(), loading: loading, children: t('import') }) })] }));
}
function OperationGroup({ sourceUid, botId, onSuccess, isGuide }) {
    const [deleteLoading, setDeleteLoading] = (0, react_2.useState)(false);
    const [refreshLoading, setRefreshLoading] = (0, react_2.useState)(false);
    const deleteSource = (0, react_2.useCallback)(() => {
        setDeleteLoading(true);
        (0, knowledgebase_1.deleteKnowledgeBaseSource)(botId, sourceUid)
            .pipe((0, rxjs_1.switchMap)(() => {
            return (0, knowledgebase_1.getKnowledgeBaseList)(botId);
        }), (0, rxjs_1.finalize)(() => setDeleteLoading(false)))
            .subscribe({
            next: onSuccess
        });
    }, [botId, sourceUid, onSuccess]);
    const refreshSource = (0, react_2.useCallback)(() => {
        if (isGuide)
            return;
        setRefreshLoading(true);
        (0, knowledgebase_1.refreshKnowledgeBaseStatus)(botId, sourceUid)
            .pipe((0, rxjs_1.switchMap)(() => {
            return (0, knowledgebase_1.getKnowledgeBaseList)(botId);
        }), (0, rxjs_1.finalize)(() => setRefreshLoading(false)))
            .subscribe({
            next: onSuccess
        });
    }, [botId, onSuccess, sourceUid]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(react_1.IconButton, { isDisabled: deleteLoading || refreshLoading, isLoading: refreshLoading, background: "none", isRound: true, _hover: {
                    backgroundColor: 'transparent'
                }, _disabled: {
                    opacity: 0.3,
                    cursor: 'not-allowed'
                }, icon: (0, jsx_runtime_1.jsx)(image_1.default, { src: UpdateIcon_svg_1.default, alt: "update knowledge base link icon" }), "aria-label": "update knowledge base link", onClick: () => refreshSource() }), (0, jsx_runtime_1.jsx)(react_1.IconButton, { isLoading: deleteLoading, isDisabled: deleteLoading || refreshLoading, background: "none", _hover: {
                    backgroundColor: 'transparent'
                }, _disabled: {
                    opacity: 0.3,
                    cursor: 'not-allowed'
                }, isRound: true, icon: (0, jsx_runtime_1.jsx)(image_1.default, { src: DeleteIcon_svg_1.default, alt: "delete knowledge base link" }), "aria-label": "delete knowledge base link", onClick: () => deleteSource() })] }));
}
function StatusTag({ text }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const border = (0, react_2.useMemo)(() => {
        return text.toLowerCase() === 'importing'
            ? 'border-primary text-primary'
            : text.toLowerCase() === 'invalid'
                ? 'border-[#FD5749] text-[#FD5749]'
                : 'border-[#01B789] text-[#01B789]';
    }, [text]);
    return ((0, jsx_runtime_1.jsx)("div", { className: `px-[8px] py-[5px] rounded-[8px] text-xs font-[500] capitalize border ${border} min-w-[80px] text-center`, children: t(text.toLowerCase()) }));
}
exports.default = KnowledgeBaseForm;
