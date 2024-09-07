import * as richTextTypes from '@contentful/rich-text-types';
import * as notionTypes from 'notion-types';
export type ImageBlockData = {
    type: 'image';
    src: string;
    alt: string;
    caption: string;
};
export type CodeBlockData = {
    type: 'code';
    properties: notionTypes.CodeBlock['properties'];
};
export type CollectionBlockData = {
    type: 'colletion';
    name: string;
    items: Array<Record<string, unknown>>;
};
export declare const notionToRichText: (recordMap: notionTypes.ExtendedRecordMap) => richTextTypes.Document;
