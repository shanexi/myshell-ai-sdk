export let singleQuote: boolean;
export let useTabs: boolean;
export let printWidth: number;
export let tabWidth: number;
export let semi: boolean;
export let htmlWhitespaceSensitivity: string;
export let arrowParens: string;
export let bracketSpacing: boolean;
export let proseWrap: string;
export let trailingComma: string;
export let endOfLine: string;
export let overrides: {
    files: string;
    options: {
        overrides: {
            files: string;
            options: {
                parser: string;
                plugins: string[];
                "prettier-plugin-strict-byte": {
                    disableBitwiseOperators: boolean;
                };
            };
        }[];
    };
}[];
