import { FeaturedCardProps } from '../model/interfaces';
type P = {
    item: FeaturedCardProps;
    recommendationSpot: string;
    index: number;
    eventName: string;
};
declare function FeaturedCard(props: P): import("react/jsx-runtime").JSX.Element;
export default FeaturedCard;
