interface EditNameProps {
    isNameAvailable: boolean;
    isChangingText: boolean;
    textName: string | undefined;
    handleChangInput: (value: any) => Promise<void>;
}
declare function EditName(props: EditNameProps): import("react/jsx-runtime").JSX.Element;
export default EditName;
