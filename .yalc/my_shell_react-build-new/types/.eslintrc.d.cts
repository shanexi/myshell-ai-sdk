export declare let parser: string;
export declare namespace parserOptions {
    let project: string;
    let tsconfigRootDir: string;
    let sourceType: string;
}
export declare let plugins: string[];
declare let _extends: string[];
export { _extends as extends };
export declare let root: boolean;
export declare namespace env {
    let node: boolean;
    let jest: boolean;
}
export declare let ignorePatterns: string[];
export declare let rules: {
    semi: string[];
    '@typescript-eslint/array-type': (string | {
        default: string;
    })[];
    '@typescript-eslint/ban-types': (string | {
        types: {
            String: {
                message: string;
            };
            Number: {
                message: string;
            };
            Boolean: {
                message: string;
            };
            Function: {
                message: string;
            };
        };
    })[];
    '@typescript-eslint/no-this-alias': string;
    'prettier/prettier': (string | {
        singleQuote: boolean;
        useTabs: boolean;
        printWidth: number;
        tabWidth: number;
        semi: boolean;
        htmlWhitespaceSensitivity: string;
        arrowParens: string;
        bracketSpacing: boolean;
        proseWrap: string;
        trailingComma: string;
        endOfLine: string;
        overrides: {
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
    })[];
    'jsdoc/newline-after-description': number;
    'newline-before-return': string;
    'import/no-duplicates': string;
    'import/no-unused-modules': string;
    'import/no-unassigned-import': string;
    'import/prefer-default-export': string;
    'import/order': (string | {
        alphabetize: {
            order: string;
            caseInsensitive: boolean;
        };
        'newlines-between': string;
        groups: (string | string[])[];
        pathGroups: {
            pattern: string;
            group: string;
            position: string;
        }[];
        pathGroupsExcludedImportTypes: never[];
    })[];
    'no-irregular-whitespace': string;
    'no-multiple-empty-lines': string;
    'no-sparse-arrays': string;
    'prefer-object-spread': string;
    'prefer-template': string;
    'prefer-const': string;
    'react/no-array-index-key': string;
    'react/function-component-definition': string;
    'no-restricted-imports': (string | {
        paths: {
            name: string;
            message: string;
        }[];
    })[];
};
