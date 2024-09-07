export default function useAuth(): {
    logout: (clearAll?: boolean) => Promise<void>;
};
