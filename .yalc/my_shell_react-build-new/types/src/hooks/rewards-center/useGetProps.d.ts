export default function useGetProps(): {
    querying: boolean;
    queryProps: () => Promise<void>;
    myProps: import("../../common/constants/interfaces/task").PropInfo[];
};
