"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CodeEditor;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("@monaco-editor/react"));
const lodash_es_1 = require("lodash-es");
const next_themes_1 = require("next-themes");
const react_2 = require("react");
const getJsonPathLines_1 = require("../../../common/utils/getJsonPathLines.js");
const tryDo_1 = require("../../../common/utils/tryDo.js");
function CodeEditor({ disabled = false, value, onValueChange, language: lang, className, foldField = '', jsonPath = '', errorMsg }) {
    const [language, setLanguage] = (0, react_2.useState)(lang ?? 'json');
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    const editorRef = (0, react_2.useRef)();
    const monaco = (0, react_1.useMonaco)();
    const [errLines, setErrorLines] = (0, react_2.useState)([]);
    (0, react_2.useEffect)(() => {
        const pathList = (0, tryDo_1.tryDo)(() => JSON.parse(jsonPath || '[]')) || [];
        const jsonPathLines = pathList.map(path => (0, getJsonPathLines_1.getJsonPathLine)(value, path));
        setErrorLines(jsonPathLines);
    }, [jsonPath, value]);
    const getLineNumberForField = (fieldName) => {
        const editor = editorRef.current;
        if (!editor)
            return -1;
        const model = editor.getModel();
        if (!model)
            return -1;
        const matches = model.findMatches(fieldName, false, true, false, null, true);
        if (matches.length > 0) {
            return matches[0].range.startLineNumber;
        }
        return -1;
    };
    (0, react_2.useEffect)(() => {
        if (monaco && editorRef.current) {
            const editor = editorRef.current;
            monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                validate: true,
                schemas: [],
                enableSchemaRequest: true,
                comments: 'ignore'
            });
            const model = editor.getModel();
            if (model) {
                if (errLines.length > 0) {
                    if (errLines[0] > 0) {
                        editor.revealLineInCenter(errLines[0]);
                    }
                    const markers = errLines.map(line => ({
                        startLineNumber: line,
                        startColumn: 1,
                        endLineNumber: line,
                        endColumn: 99999,
                        message: errorMsg?.msg || '',
                        severity: monaco.MarkerSeverity.Error
                    }));
                    monaco.editor.setModelMarkers(model, 'proconfig', markers);
                }
                else {
                    monaco.editor.setModelMarkers(model, 'proconfig', []);
                }
            }
        }
    }, [errLines, monaco, errorMsg]);
    const handleEditorValidation = (markers) => {
        markers.forEach(marker => console.log('onValidate:', marker.message));
    };
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        if (foldField) {
            const line = getLineNumberForField(foldField || '');
            const editorText = editor.getValue();
            let jsonData = {};
            try {
                jsonData = JSON.parse(editorText || '{}');
            }
            catch { }
            if (line > 0) {
                if ((0, lodash_es_1.isArray)(jsonData?.[foldField]) && !jsonData?.[foldField].length) {
                    return;
                }
                editor.setSelection({
                    startLineNumber: line,
                    startColumn: 1,
                    endLineNumber: line,
                    endColumn: 1
                });
                editor.trigger('fold', 'editor.fold', {
                    selectionLines: [line]
                });
            }
        }
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            comments: 'ignore'
        });
    };
    const handleValueChange = (0, lodash_es_1.debounce)((value, ev) => {
        requestAnimationFrame(() => onValueChange(value));
    }, 500);
    return ((0, jsx_runtime_1.jsx)(react_1.default, { language: language, theme: isDark ? 'vs-dark' : 'light', value: value, onChange: handleValueChange, onValidate: handleEditorValidation, onMount: handleEditorDidMount, className: className, options: {
            lineNumbersMinChars: 6,
            readOnly: disabled,
            minimap: {
                enabled: false
            },
            contextmenu: false,
            fontSize: 16,
            fontWeight: '500'
        } }));
}
