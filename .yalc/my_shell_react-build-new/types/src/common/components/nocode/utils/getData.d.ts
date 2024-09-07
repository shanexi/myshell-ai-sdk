import { ITree, INodes, IAttrs } from '../types/IStore';
declare function getData(path: string, { attrs }: {
    tree: ITree;
    nodes: INodes;
    attrs: IAttrs;
}): import("react-hook-form").FieldValues;
declare function getDataByNodeName(name: string, { tree, attrs, nodes }: {
    tree: ITree;
    nodes: INodes;
    attrs: IAttrs;
}): import("react-hook-form").FieldValues | undefined;
export { getData, getDataByNodeName };
