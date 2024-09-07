import { type ClassValue } from 'clsx';
export declare function cn(...inputs: ClassValue[]): string;
export declare function getAlternatesMap(pathname: string, isMobile?: boolean): {
    canonical: string;
    media: {
        'only screen and (max-width: 768px)': string;
    };
};
export declare function limitStringLength(str: string, limit: 10): string;
