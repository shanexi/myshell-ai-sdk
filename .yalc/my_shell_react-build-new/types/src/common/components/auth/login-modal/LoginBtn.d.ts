declare global {
    interface Window {
        okxwallet: any;
    }
}
export interface ILoginBtnProps {
    noStyle?: boolean;
    showArray?: boolean;
    showDescription?: boolean;
}
declare function LoginBtn({ showArray, showDescription, noStyle }: ILoginBtnProps): import("react/jsx-runtime").JSX.Element | null;
export default LoginBtn;
