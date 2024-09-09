import { jsx as _jsx } from "react/jsx-runtime";
import MicrophoneIcon from '@heroicons/react/24/outline/MicrophoneIcon';
import { IconButton } from '../../../../../common/components/ui/icon-button.js';
export function AudioInput({ onStart, disabled = false }) {
    return (_jsx(IconButton, { onClick: onStart, variant: "ghost", color: "brand", size: "md", disabled: disabled, icon: MicrophoneIcon }));
}
