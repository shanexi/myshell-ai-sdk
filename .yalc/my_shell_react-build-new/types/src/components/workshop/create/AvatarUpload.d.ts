import { Scenario } from '../../../../../src/apis/common.js';
export default function AvatarUploader({ imgUrl, uploadFile, trackClick, scenario, className, imgClass }: {
    imgUrl: string;
    scenario?: Scenario;
    uploadFile: (logoUrl: string, logo: string) => void;
    trackClick?: (area: number) => void;
    className?: string;
    imgClass?: string;
}): import("react/jsx-runtime").JSX.Element;
