declare function useLongPress(callback: (e: any) => void, duration?: number, startCb?: (e: any) => void): {
    onTouchStart: (e: any) => void;
    onTouchEnd: (e: any) => void;
    onTouchCancel: (e: any) => void;
};
export default useLongPress;
