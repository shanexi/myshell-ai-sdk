"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notionToRichText = void 0;
const richTextTypes = __importStar(require("@contentful/rich-text-types"));
const lodash_es_1 = require("lodash-es");
const DecorationMap = {
    b: 'bold',
    i: 'italic',
    s: 'strikethrough',
    u: 'underline',
    c: 'code'
};
const toMark = (mark) => {
    const [typeId, data] = mark;
    return {
        type: DecorationMap[typeId] ?? 'text',
        data
    };
};
const toText = (text) => {
    const [value, subdecorations = []] = text;
    const hyperlink = subdecorations.find(subdecoration => subdecoration.includes('a'));
    if (hyperlink) {
        const subdecorationsWithoutHyperlink = subdecorations.filter(subdecoration => subdecoration !== hyperlink);
        return {
            nodeType: richTextTypes.INLINES.HYPERLINK,
            content: [toText([value, subdecorationsWithoutHyperlink])],
            data: {
                uri: hyperlink[1]
            }
        };
    }
    return {
        nodeType: 'text',
        data: {},
        value,
        marks: subdecorations.filter(subdecoration => Object.keys(DecorationMap).includes(subdecoration[0])).map(toMark)
    };
};
const toPlainText = (text) => {
    if (!text.length)
        return '';
    if (Array.isArray(text[0])) {
        return text.map(toPlainText).join('');
    }
    return text[0];
};
const HeadingMap = {
    header: richTextTypes.BLOCKS.HEADING_2,
    sub_header: richTextTypes.BLOCKS.HEADING_3,
    sub_sub_header: richTextTypes.BLOCKS.HEADING_4
};
const toHeading = (block) => {
    const content = block.properties?.title;
    if ((0, lodash_es_1.isEmpty)(content)) {
        return null;
    }
    return {
        nodeType: HeadingMap[block.type],
        content: content.map(toText)
    };
};
const toQuote = (block) => {
    const content = block.properties?.title;
    if ((0, lodash_es_1.isEmpty)(content)) {
        return null;
    }
    return {
        nodeType: richTextTypes.BLOCKS.QUOTE,
        content: content.map(toText)
    };
};
const toParagraph = (block) => {
    const content = block.properties?.title;
    return {
        nodeType: richTextTypes.BLOCKS.PARAGRAPH,
        content: (content ?? [[' ']]).map(toText)
    };
};
const toList = (block) => {
    return {
        nodeType: richTextTypes.BLOCKS.LIST_ITEM,
        listType: block.type === 'bulleted_list' ? richTextTypes.BLOCKS.UL_LIST : richTextTypes.BLOCKS.OL_LIST,
        content: [toParagraph(block)]
    };
};
const toImage = (block) => {
    const url = block.format?.display_source ?? '';
    const isHostedByNotion = url.startsWith('/images/');
    const src = isHostedByNotion ? `https://notion.so${url}` : url;
    const caption = block.properties.caption?.[0] ?? block.properties.title?.[0] ?? ['Untitled'];
    const alt = block.properties?.alt_text?.join(',') ?? caption[0] ?? 'Untitled';
    return {
        nodeType: richTextTypes.BLOCKS.EMBEDDED_ASSET,
        data: {
            type: 'image',
            src,
            alt,
            caption: caption[0]
        },
        content: []
    };
};
const toHorizontalRule = () => {
    return {
        content: [],
        nodeType: richTextTypes.BLOCKS.HR
    };
};
const toCodeBlock = (block) => {
    return {
        nodeType: richTextTypes.BLOCKS.EMBEDDED_ENTRY,
        data: {
            type: block.type,
            properties: block.properties
        },
        content: []
    };
};
const toCollection = (block, recordMap) => {
    const collectionID = block.collection_id ?? '';
    const viewIDs = block.view_ids ?? [''];
    const collection = recordMap.collection[collectionID]?.value;
    const itemIDs = recordMap.collection_query[collectionID ?? '']?.[viewIDs?.[0] ?? '']?.collection_group_results?.blockIds ?? [];
    const schema = (0, lodash_es_1.mapValues)(collection?.schema, v => v.name);
    const items = itemIDs.map(itemID => {
        const data = recordMap.block[itemID]?.value.properties ?? {};
        const item = (0, lodash_es_1.mapKeys)(data, (_, key) => schema[key] ?? key);
        const singleValueItem = (0, lodash_es_1.mapValues)(item, v => toPlainText(v));
        return singleValueItem;
    });
    return {
        nodeType: richTextTypes.BLOCKS.EMBEDDED_ENTRY,
        data: {
            type: 'collection',
            name: toPlainText(collection.name),
            items
        },
        content: []
    };
};
const toDocument = (block) => {
    if (block.parent_table === 'block') {
        return {
            nodeType: richTextTypes.BLOCKS.DOCUMENT,
            data: {
                title: block.properties?.title?.[0]?.[0] ?? ''
            },
            content: []
        };
    }
    if (block.parent_table === 'collection') {
        return {
            nodeType: richTextTypes.BLOCKS.EMBEDDED_ENTRY,
            data: {},
            content: []
        };
    }
    return null;
};
const BlockHandlerMap = {
    page: toDocument,
    header: toHeading,
    sub_header: toHeading,
    sub_sub_header: toHeading,
    quote: toQuote,
    bulleted_list: toList,
    numbered_list: toList,
    image: toImage,
    code: toCodeBlock,
    collection_view: toCollection,
    divider: toHorizontalRule,
    text: toParagraph
};
const notionBlocksToRichTextBlocks = (blocks, recordMap) => {
    const nodes = [];
    let tmpListType = null;
    let tmpListContent = [];
    for (const block of blocks) {
        const { type } = block;
        const transformer = BlockHandlerMap[type];
        if (!transformer) {
            continue;
        }
        const node = transformer(block, recordMap);
        if (!node) {
            continue;
        }
        const { listType, ...rest } = node;
        const isEndOfList = tmpListContent.length && tmpListType !== listType;
        if (isEndOfList) {
            nodes.push({
                nodeType: tmpListType,
                content: tmpListContent,
                data: {}
            });
            tmpListType = null;
            tmpListContent = [];
        }
        const isList = !!listType;
        if (isList) {
            const isStartOfList = !tmpListType && !tmpListContent.length;
            if (isStartOfList) {
                tmpListType = listType;
                tmpListContent = [rest];
            }
            else {
                tmpListContent.push(rest);
            }
            continue;
        }
        nodes.push(rest);
    }
    return nodes;
};
const EmptyNode = {
    nodeType: richTextTypes.BLOCKS.DOCUMENT,
    data: {},
    content: []
};
const createTitleNode = (block) => {
    const content = block.properties?.title;
    if ((0, lodash_es_1.isEmpty)(content)) {
        return null;
    }
    return {
        nodeType: richTextTypes.BLOCKS.HEADING_1,
        data: {},
        content: content.map(toText)
    };
};
const notionToRichText = (recordMap) => {
    const id = Object.keys(recordMap.block)[0];
    const block = recordMap.block[id]?.value;
    if (!block) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('missing block', id);
        }
        return EmptyNode;
    }
    const children = block.content?.map(id => recordMap.block[id]?.value) ?? [];
    const content = notionBlocksToRichTextBlocks(children, recordMap);
    const titleNode = createTitleNode(block);
    return {
        nodeType: richTextTypes.BLOCKS.DOCUMENT,
        data: {},
        content: titleNode ? [titleNode, ...content] : content
    };
};
exports.notionToRichText = notionToRichText;
