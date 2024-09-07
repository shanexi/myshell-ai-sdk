import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';
type Size = 'sm' | 'lg';
declare const Slider: React.ForwardRefExoticComponent<Omit<SliderPrimitive.SliderProps & React.RefAttributes<HTMLSpanElement>, "ref"> & {
    size?: Size;
} & React.RefAttributes<HTMLSpanElement>>;
interface ISliderBaseProps extends React.RefAttributes<HTMLSpanElement>, Omit<SliderPrimitive.SliderProps, 'value' | 'defaultValue' | 'onValueChange' | 'onValueCommit'> {
}
interface ISliderSingleProps extends ISliderBaseProps {
    size?: Size;
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number) => void;
    onValueCommit?: (value: number) => void;
}
declare const SliderSingle: React.ForwardRefExoticComponent<Omit<ISliderSingleProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
export { Slider, SliderSingle };
