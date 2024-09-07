export let darkMode: string;
export namespace future {
    let hoverOnlyWhenSupported: boolean;
}
export let content: string[];
export namespace theme {
    let screens: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        large: string;
        '2xl': string;
    };
    namespace extend {
        let colors: {
            primary: {
                DEFAULT: string;
                foreground: string;
                fixed: string;
            };
            secondary: {
                DEFAULT: string;
                container: string;
            };
            on: {
                primary: string;
                secondary: string;
                'secondary-container': string;
                surface: string;
                'surface-variant': string;
                error: string;
                'error-container': string;
            };
            surface: {
                DEFAULT: string;
                bold: string;
                subtlest: string;
                normal: string;
                variant: string;
                'variant-99': string;
                'container-low': string;
                'container-high': string;
                'create-bg': string;
                bright: string;
                default: string;
                subtle: string;
                hovered: string;
                'hoverd-static': string;
                pressed: string;
                'pressed-static': string;
                special: string;
                disabled: string;
                'disabled-static': string;
                'search-field': string;
                inverse: string;
                accent: {
                    green: {
                        subtle: string;
                        subtler: string;
                        subtlest: string;
                        bolder: string;
                    };
                    aqua: {
                        subtle: string;
                        subtler: string;
                        subtlest: string;
                        bolder: string;
                    };
                    blue: {
                        subtle: string;
                        subtler: string;
                        subtlest: string;
                        bolder: string;
                    };
                    yellow: {
                        subtle: string;
                        subtler: string;
                        subtlest: string;
                        bolder: string;
                    };
                    red: {
                        subtle: string;
                        subtler: string;
                        subtlest: string;
                        bolder: string;
                    };
                    gray: {
                        subtle: string;
                        subtler: string;
                        subtlest: string;
                        bolder: string;
                    };
                };
                primary: {
                    default: string;
                    hovered: string;
                    pressed: string;
                    subtle: {
                        default: string;
                        hovered: string;
                        pressed: string;
                    };
                };
                container: {
                    DEFAULT: string;
                    default: string;
                    hovered: string;
                    pressed: string;
                    selected: {
                        default: string;
                        hovered: string;
                        pressed: string;
                    };
                };
                warning: {
                    default: string;
                    hovered: string;
                    pressed: string;
                    subtle: {
                        default: string;
                        hovered: string;
                        pressed: string;
                    };
                };
                success: {
                    default: string;
                    hovered: string;
                    pressed: string;
                    subtle: {
                        default: string;
                        hovered: string;
                        pressed: string;
                    };
                };
                critical: {
                    default: string;
                    hovered: string;
                    pressed: string;
                    subtle: {
                        default: string;
                        hovered: string;
                        pressed: string;
                    };
                };
                info: {
                    default: string;
                    hovered: string;
                    pressed: string;
                    subtle: {
                        default: string;
                        hovered: string;
                        pressed: string;
                    };
                };
                lemon: {
                    bold: string;
                    default: string;
                    subtle: string;
                    subtlest: string;
                };
            };
            alpha: {
                1: string;
                3: string;
                5: string;
                8: string;
                10: string;
                20: string;
                30: string;
                40: string;
                50: string;
                60: string;
                70: string;
                80: string;
                90: string;
                100: string;
                facetime: {
                    white: string;
                    black: string;
                    static: string;
                };
                mask: {
                    desktop: string;
                    mobile: string;
                };
            };
            'beta-white': {
                1: string;
                3: string;
                5: string;
                8: string;
                10: string;
                20: string;
                30: string;
                40: string;
                50: string;
                60: string;
                70: string;
                80: string;
                90: string;
                100: string;
            };
            'beta-black': {
                1: string;
                3: string;
                5: string;
                8: string;
                10: string;
                20: string;
                30: string;
                40: string;
                50: string;
                60: string;
                70: string;
                80: string;
                90: string;
                100: string;
            };
            inverse: {
                primary: string;
                surface: string;
            };
            error: {
                DEFAULT: string;
                container: string;
            };
            'white-opacity-95': string;
            'white-opacity-75': string;
            'black-opacity-95': string;
            'black-opacity-75': string;
            'task-black-opacity-75': string;
            'black-10': string;
            'white-10': string;
            neutral: {
                DEFAULT: string;
                10: string;
                20: string;
                30: string;
                40: string;
                50: string;
                60: string;
                70: string;
                75: string;
                80: string;
                85: string;
                90: string;
                95: string;
                99: string;
                variant: {
                    DEFAULT: string;
                    5: string;
                    10: string;
                    15: string;
                    20: string;
                    30: string;
                    35: string;
                    40: string;
                    50: string;
                    60: string;
                    70: string;
                    80: string;
                    85: string;
                    88: string;
                    90: string;
                    95: string;
                    99: string;
                };
                dark: {
                    DEFAULT: string;
                    5: string;
                    10: string;
                    15: string;
                    20: string;
                    25: string;
                    30: string;
                    40: string;
                    50: string;
                    60: string;
                    70: string;
                    80: string;
                    85: string;
                    90: string;
                    95: string;
                    99: string;
                    special: {
                        DEFAULT: string;
                        5: string;
                        10: string;
                        20: string;
                        30: string;
                        40: string;
                    };
                };
            };
            blue: {
                DEFAULT: string;
                5: string;
                10: string;
                15: string;
                20: string;
                30: string;
                40: string;
                50: string;
                60: string;
                70: string;
                80: string;
                90: string;
                95: string;
                dark: {
                    10: string;
                    20: string;
                    30: string;
                    40: string;
                    50: string;
                };
            };
            red: {
                DEFAULT: string;
                10: string;
                20: string;
                25: string;
                30: string;
                40: string;
                50: string;
                55: string;
                60: string;
                70: string;
                80: string;
                90: string;
                95: string;
                dark: {
                    10: string;
                    20: string;
                    30: string;
                };
            };
            yellow: {
                DEFAULT: string;
                5: string;
                10: string;
                15: string;
                20: string;
                30: string;
                35: string;
                40: string;
                50: string;
                60: string;
                70: string;
                80: string;
                90: string;
                95: string;
                dark: {
                    10: string;
                    20: string;
                    30: string;
                };
            };
            aqua: {
                DEFAULT: string;
                5: string;
                10: string;
                20: string;
                25: string;
                30: string;
                40: string;
                50: string;
                55: string;
                60: string;
                70: string;
                75: string;
                80: string;
                90: string;
                95: string;
                dark: {
                    10: string;
                    20: string;
                    30: string;
                };
            };
            green: {
                DEFAULT: string;
                10: string;
                20: string;
                25: string;
                30: string;
                40: string;
                50: string;
                60: string;
                70: string;
                80: string;
                90: string;
                95: string;
                dark: {
                    10: string;
                    20: string;
                    30: string;
                };
            };
            lemon: {
                DEFAULT: string;
                20: string;
                40: string;
                50: string;
                60: string;
                70: string;
                80: string;
                90: string;
            };
            utility: {
                status01: {
                    20: string;
                    30: string;
                    40: string;
                    50: string;
                    60: string;
                    70: string;
                    80: string;
                    90: string;
                };
                status02: {
                    20: string;
                    30: string;
                    40: string;
                    50: string;
                    60: string;
                    70: string;
                    80: string;
                    90: string;
                };
                status03: {
                    20: string;
                    30: string;
                    40: string;
                    50: string;
                    60: string;
                    70: string;
                    80: string;
                    90: string;
                };
                status04: {
                    20: string;
                    30: string;
                    40: string;
                    50: string;
                    60: string;
                    70: string;
                    80: string;
                    90: string;
                };
                status05: {
                    20: string;
                    30: string;
                    40: string;
                    50: string;
                    60: string;
                    70: string;
                    80: string;
                    90: string;
                };
                'sky-blue': {
                    500: string;
                };
            };
            icon: {
                DEFAULT: string;
                subtle: string;
                subtlest: string;
                disabled: string;
                inverse: string;
                static: string;
                'static-black': string;
                brand: string;
                critical: string;
                warning: string;
                success: string;
            };
        };
        let textColor: {
            default: string;
            subtle: string;
            subtler: string;
            subtlest: string;
            disabled: string;
            inverse: string;
            'inverse-primary': string;
            'inverse-surface': string;
            static: string;
            'static-black': string;
            brand: string;
            critical: string;
            'critical-bolder': string;
            warning: string;
            'warning-bolder': string;
            success: string;
            'success-bolder': string;
        };
        let borderColor: {
            static: string;
            default: string;
            subtle: string;
            hovered: string;
            pressed: string;
            depressed: string;
            critical: string;
            success: string;
            brand: string;
            opaque: string;
            warning: string;
            'warning-subtle': string;
        };
        let backgroundColor: {
            static: string;
            'static-black': string;
        };
        let width: {
            4.5: string;
            5.5: string;
            6.5: string;
            7.5: string;
            8.5: string;
            9.5: string;
            13: string;
            15: string;
            17: string;
            18: string;
            19: string;
            21: string;
            22: string;
            23: string;
            25: string;
            26: string;
            27: string;
            28: string;
            29: string;
            30: string;
            70: string;
            web3marquee: string;
            'agent-empty': string;
            'mobile-recommend-card': string;
            'gradient-button': string;
            holders: string;
        };
        let height: {
            4.5: string;
            5.5: string;
            6.5: string;
            7.5: string;
            8.5: string;
            9.5: string;
            13: string;
            15: string;
            17: string;
            18: string;
            19: string;
            21: string;
            22: string;
            23: string;
            25: string;
            26: string;
            27: string;
            28: string;
            29: string;
            30: string;
            dvh: string;
            workshop: string;
            'agent-empty': string;
        };
        let space: {
            4.5: string;
            5.5: string;
            6.5: string;
            7.5: string;
            8.5: string;
            9.5: string;
        };
        namespace gridTemplateColumns {
            let bot: string;
            let mbot: string;
        }
        let animation: {
            loading: string;
            slideIn: string;
            slideIn1: string;
            spark: string;
            move: string;
            'accordion-down': string;
            'accordion-up': string;
        };
        let keyframes: {
            spark: {
                '0%': {
                    transform: string;
                };
                '50%': {
                    transform: string;
                };
                '100%': {
                    transform: string;
                };
            };
            loading: {
                '0%, 100%': {
                    'background-position': string;
                };
                '50%': {
                    'background-position': string;
                };
            };
            slideIn: {
                '0%': {
                    opacity: number;
                    transform: string;
                };
                '100%': {
                    opacity: number;
                    transform: string;
                };
            };
            slideIn1: {
                '0%': {
                    opacity: number;
                    transform: string;
                    left: string;
                };
                '100%': {
                    opacity: number;
                    transform: string;
                    left: string;
                };
            };
            move: {
                '0%': {
                    'background-position': string;
                };
                '100%': {
                    'background-position': string;
                };
            };
            'accordion-down': {
                from: {
                    height: string;
                };
                to: {
                    height: string;
                };
            };
            'accordion-up': {
                from: {
                    height: string;
                };
                to: {
                    height: string;
                };
            };
        };
        let fontFamily: {
            'mona-sans': string[];
            'pp-telegraf': string[];
            'roboto-mono': string[];
            ppt: string[];
            'ppt-ultra-bold': string[];
            mochiy: string[];
            youyuan: string[];
        };
        let fontSize: {
            '2xs': string[];
            '3xl': string[];
            '4xl': string[];
            '5xl': string[];
            '6xl': string[];
            '7xl': string[];
        };
        let boxShadow: {
            'background-default': string;
            'background-bolder': string;
            'button-basic': string;
            'button-primary': string;
            'button-primary1': string;
            'button-primary2': string;
            'button-pressed': string;
            'modal-default': string;
            'modal-bolder': string;
            'rings-brand': string;
            'rings-error': string;
            'rings-warning': string;
            tabBar: string;
            header: string;
            modal: string;
            textarea: string;
        };
        namespace ringColor {
            let brand: string;
            let error: string;
        }
        let backdropBlur: {};
        let backgroundImage: {
            'gradient-blue': string;
            'gradient-pink': string;
            'light-task-gradient': string;
            'dark-task-gradient': string;
            'light-mask': string;
            'dark-mask': string;
            'share-key': string;
            'share-key-hover': string;
            'share-key-press': string;
            'new-tag-gradient': string;
            'mobile-light-mask': string;
            'mobile-dark-mask': string;
            'stripped-loading': string;
            'pink-button': string;
        };
        namespace typography {
            namespace DEFAULT {
                let css: {
                    '--tw-prose-body': string;
                    '--tw-prose-invert-body': string;
                    pre: {
                        'border-radius': number;
                    };
                };
            }
        }
        let borderRadius: {
            '3xl': string;
            '4xl': string;
            '5xl': string;
        };
    }
}
export let plugins: (typeof import("@tailwindcss/typography") | {
    handler: () => void;
})[];
