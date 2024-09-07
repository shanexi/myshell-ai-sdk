export declare function useEdit(): {
    isNameAvailable: boolean;
    isNameError: boolean;
    editUser: {
        name: string | undefined;
        avatar: string | undefined;
        background: string | undefined;
        description: string | undefined;
        loginCredential: string | undefined;
        loginType: import("../../common/constants/enums/user").LoginType | undefined;
    };
    handleChangInput: (value: any) => Promise<void>;
    updateUser: (updateUser: any, callback?: (isSuc: boolean) => void) => Promise<void>;
    setEditUser: import("react").Dispatch<import("react").SetStateAction<{
        name: string | undefined;
        avatar: string | undefined;
        background: string | undefined;
        description: string | undefined;
        loginCredential: string | undefined;
        loginType: import("../../common/constants/enums/user").LoginType | undefined;
    }>>;
};
export default useEdit;
