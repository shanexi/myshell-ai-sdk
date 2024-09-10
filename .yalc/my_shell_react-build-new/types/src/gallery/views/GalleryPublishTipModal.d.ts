import { TModalState } from '../../../../src/common/components/ui/modal.js';
export default function GalleryPublishTipModal({ publishing, open, publishState, onClose, onConfirm }: {
    publishing: boolean;
    open: boolean;
    publishState: TModalState;
    onClose: () => void;
    onConfirm: () => void;
}): import("react/jsx-runtime").JSX.Element;
