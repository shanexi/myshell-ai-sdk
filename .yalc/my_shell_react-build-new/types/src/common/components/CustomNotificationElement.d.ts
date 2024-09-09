import { ToastOptions } from 'react-hot-toast';
import { CustomToasterProps } from '../../../../src/common/hooks/useNotification';
export default function CustomNotificationElement({ tProps, customProps }: {
    tProps: ToastOptions;
    customProps: CustomToasterProps;
}): import("react/jsx-runtime").JSX.Element;
