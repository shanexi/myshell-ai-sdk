declare function useDebounce<T>(callback: (...args: T[]) => void, delay: number): (...args: T[]) => void;
export default useDebounce;
