import { ISchema } from '../../form-engine';
import { ITree, INodes, IAttrs } from '../types/IStore';
import { IMaterial } from '../types/IMaterial';
declare function getSchema(material: IMaterial, { path, tree, nodes, attrs }: {
    path: string;
    tree: ITree;
    nodes: INodes;
    attrs: IAttrs;
}): ISchema | undefined;
export { getSchema };
