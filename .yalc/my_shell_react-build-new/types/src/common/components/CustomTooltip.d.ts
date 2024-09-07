import { PlacementWithLogical } from '@chakra-ui/react';
import { JSXElementConstructor, ReactElement, ReactNode } from 'react';
interface CustomTooltipProps {
    children: ReactNode;
    content: string | ReactElement<any, string | JSXElementConstructor<any>> | any;
    customClassNames?: string;
    spanClassNames?: string;
    position?: PlacementWithLogical;
    offset?: [number, number];
    hasArrow?: boolean;
    closeDelay?: number;
    isDisabled?: boolean;
    containerClassNames?: string;
    withSpan?: boolean;
    bg?: string;
}
declare function CustomTooltip({ children, content, customClassNames, spanClassNames, position, offset, hasArrow, closeDelay, isDisabled, containerClassNames, withSpan, bg }: CustomTooltipProps): import("react/jsx-runtime").JSX.Element;
export default CustomTooltip;
