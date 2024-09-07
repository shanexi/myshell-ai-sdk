export type CodeEditorSupportedLang = 'javascript' | 'json';
type P = {
    disabled?: boolean;
    value?: string;
    onValueChange: (value?: string) => void;
    language?: CodeEditorSupportedLang;
    className?: string;
    foldField?: string;
    jsonPath?: string;
    errorMsg?: {
        msg?: string;
        reason?: string;
    };
};
export default function CodeEditor({ disabled, value, onValueChange, language: lang, className, foldField, jsonPath, errorMsg }: P): import("react/jsx-runtime").JSX.Element;
export {};
