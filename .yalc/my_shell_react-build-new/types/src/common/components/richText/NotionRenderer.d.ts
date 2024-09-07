import { Options, NodeRenderer } from '@contentful/rich-text-react-renderer';
import * as notionTypes from 'notion-types';
import { ImageBlockData, CollectionBlockData, CodeBlockData } from '../../../../../src/common/components/richText/formatter.js';
type ExtendedOptions = Options & {
    renderEntity?: Partial<Record<'code' | 'collection', NodeRenderer>>;
    renderAsset?: Partial<Record<'image', NodeRenderer>>;
};
export declare const NotionRenderer: React.FC<{
    recordMap: notionTypes.ExtendedRecordMap;
    options?: ExtendedOptions;
    className?: string;
}>;
export type { ExtendedOptions, CodeBlockData, CollectionBlockData, ImageBlockData };
