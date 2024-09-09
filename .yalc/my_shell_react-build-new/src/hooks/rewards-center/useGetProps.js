import { getProps } from '../../apis/task.js';
import { useTaskStore } from '../../services/store/index.js';
export default function useGetProps() {
    const setMyProps = useTaskStore(state => state.setMyProps);
    const myProps = useTaskStore(state => state.myProps);
    const querying = useTaskStore(state => state.myPropsQuerying);
    const setMyPropsQuerying = useTaskStore(state => state.setMyPropsQuerying);
    const queryProps = async () => {
        try {
            setMyPropsQuerying(true);
            const { data } = await getProps();
            setMyProps(data ?? []);
        }
        catch (e) {
        }
        finally {
            setMyPropsQuerying(false);
        }
    };
    return { querying, queryProps, myProps };
}
