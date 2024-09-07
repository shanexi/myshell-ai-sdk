import { ThemeProvider as NextThemesProvider } from 'next-themes';
type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0];
export declare function ThemeProvider({ children, ...props }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
