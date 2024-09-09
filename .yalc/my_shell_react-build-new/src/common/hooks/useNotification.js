import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import CustomNotificationElement from '../../common/components/CustomNotificationElement.js';
export function useNotification() {
    const addToast = useCallback((config, duration) => {
        if (config.id) {
            toast.remove(config.id);
        }
        toast.custom((t) => {
            return _jsx(CustomNotificationElement, { tProps: { ...t, duration }, customProps: config });
        }, {
            id: config.id
        });
    }, []);
    const message = useCallback((config) => addToast({
        ...config
    }), []);
    const success = useCallback((config) => addToast({
        ...config,
        type: 'success'
    }), []);
    const error = useCallback((config) => addToast({
        ...config,
        type: 'error'
    }), []);
    const warning = useCallback((config) => addToast({
        ...config,
        type: 'warning'
    }), []);
    const info = useCallback((config, duration) => addToast({
        ...config,
        type: 'info'
    }, duration), []);
    const close = useCallback((id) => {
        toast.dismiss(id);
    }, []);
    return { addToast, success, error, warning, info, close, message };
}
export class Message {
    static _toast(config) {
        if (config.id) {
            toast.remove(config.id);
        }
        const addToast = () => {
            toast.custom((t) => {
                return _jsx(CustomNotificationElement, { tProps: t, customProps: config });
            }, {
                id: config.id
            });
        };
        addToast();
    }
    static success(config) {
        return this._toast({
            ...config,
            type: 'success'
        });
    }
    static error(config) {
        return this._toast({
            ...config,
            type: 'error'
        });
    }
    static info(config) {
        return this._toast({
            ...config,
            type: 'info'
        });
    }
    static warning(config) {
        return this._toast({
            ...config,
            type: 'warning'
        });
    }
    static close(id) {
        toast.dismiss(id);
    }
}
