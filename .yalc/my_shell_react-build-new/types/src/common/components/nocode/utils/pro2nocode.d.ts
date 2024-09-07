import { IAutomata } from '../types/IAutomata';
import { IProConfig, IProConfigState, IProConfigWidget } from '../types/IProConfig';
import { IType, ITree, IAttrs, INodes } from '../types/IStore';
export declare const proconfigData2nodecodeData: (props: {
    data: IProConfig | IProConfigState | IProConfigWidget;
    type: IType;
    tree: ITree;
    nodes: INodes;
    attrs: IAttrs;
    active: string;
}) => IAutomata;
export declare const nodecodeData2proconfigData: (data: IAutomata, type: IType, path: string) => IProConfig | IProConfigState | IProConfigWidget;
