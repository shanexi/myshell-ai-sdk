import { useCallback, useState } from 'react';
import { onUseProp } from '../../apis/task.js';
import useGetProps from './useGetProps.js';
export default function useUseProp() {
    const [acting, setActing] = useState(false);
    const { queryProps } = useGetProps();
    const handleUseProp = useCallback(async (propId, prop, count, successCb) => {
        try {
            setActing(true);
            await onUseProp(propId, count);
            successCb && successCb();
            queryProps();
        }
        catch (e) {
        }
        finally {
            setActing(false);
        }
    }, [queryProps]);
    return {
        acting,
        handleUseProp
    };
}
