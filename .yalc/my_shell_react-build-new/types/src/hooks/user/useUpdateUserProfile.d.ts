export default function useUpdateUserProfile(): {
    queryUserProfile: () => Promise<import("../../common/constants/interfaces/user").User>;
};
