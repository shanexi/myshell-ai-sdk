/**
 * @internal
 * 0 : same
 * 1 : A is before B (forward)
 * -1: A is after B (backward)
 */
const compareLine = ([lineA], [lineB]) => {
    if (lineA === lineB) {
        return 0;
    }
    else {
        return lineA < lineB ? 1 : -1;
    }
};
/**
 * @internal
 * 0 : same
 * 1 : A is before B (forward)
 * -1: A is after B (backward)
 */
const comparePosition = (posA, posB) => {
    const line = compareLine(posA, posB);
    if (line === 0) {
        return posA[1] === posB[1] ? 0 : posA[1] < posB[1] ? 1 : -1;
    }
    else {
        return line;
    }
};
/**
 * @internal
 */
const edges = (a, b) => {
    return comparePosition(a, b) === -1 ? [b, a] : [a, b];
};

const NODE_TEXT = 1;
const NODE_VOID = 2;

const isTextNode$1 = (node) => node.type === NODE_TEXT;
const getNodeSize$1 = (node) => isTextNode$1(node) ? node.text.length : 1;
/**
 * @internal
 */
const getLineSize = (line) => line.reduce((acc, n) => acc + getNodeSize$1(n), 0);
const merge = (...lines) => {
    const result = [];
    for (const line of lines) {
        if (!result.length) {
            result.push(...line);
        }
        else {
            for (const node of line) {
                const index = result.length - 1;
                const target = result[index];
                if (isTextNode$1(node) && isTextNode$1(target)) {
                    result[index] = { type: NODE_TEXT, text: target.text + node.text };
                }
                else {
                    result.push(node);
                }
            }
        }
    }
    return result;
};
const split = (line, offset) => {
    for (let i = 0; i < line.length; i++) {
        const node = line[i];
        const size = getNodeSize$1(node);
        if (size > offset) {
            const before = line.slice(0, i);
            const after = line.slice(i + 1);
            if (isTextNode$1(node)) {
                const beforeText = node.text.slice(0, offset);
                const afterText = node.text.slice(offset);
                if (beforeText) {
                    before.push({ type: NODE_TEXT, text: beforeText });
                }
                if (afterText) {
                    after.unshift({ type: NODE_TEXT, text: afterText });
                }
            }
            else {
                // node size must be 1
                after.unshift(node);
            }
            return [before, after];
        }
        offset -= size;
    }
    return [line, []];
};
const fixPositionAfterInsert = (selectionPos, pos, lineDiff, lastRowLength) => {
    return [
        selectionPos[0] + lineDiff,
        selectionPos[1] +
            (compareLine(selectionPos, pos) === 0
                ? lastRowLength - (lineDiff === 0 ? 0 : pos[1])
                : 0),
    ];
};
const fixPositionAfterDelete = (selectionPos, start, end) => {
    return comparePosition(end, selectionPos) === 1
        ? [
            selectionPos[0] + start[0] - end[0],
            selectionPos[1] +
                (compareLine(end, selectionPos) === 0 ? start[1] - end[1] : 0),
        ]
        : start;
};
const replaceRange = (doc, fragment, start, end) => {
    const [startLine] = start;
    const [endLine] = end || start;
    const splitByStart = split(doc[start[0]], start[1]);
    const before = splitByStart[0];
    const after = end ? split(doc[end[0]], end[1])[1] : splitByStart[1];
    const lines = [...fragment];
    if (lines.length) {
        lines[0] = merge(before, lines[0]);
        lines[lines.length - 1] = merge(lines[lines.length - 1], after);
    }
    else {
        lines.push(merge(before, after));
    }
    doc.splice(startLine, endLine - startLine + 1, ...lines);
};
/**
 * @internal
 */
const sliceDoc = (doc, start, end) => {
    if (compareLine(start, end) === 0) {
        return [split(split(doc[start[0]], end[1])[0], start[1])[1]];
    }
    return [
        split(doc[start[0]], start[1])[1],
        ...doc.slice(start[0] + 1, end[0]),
        split(doc[end[0]], end[1])[0],
    ];
};
/**
 * @internal
 */
const insertEdit = (doc, selection, lines, pos) => {
    const [anchor, focus] = selection;
    const lineLength = lines.length;
    const lineDiff = lineLength - 1;
    const lastRowLength = getLineSize(lines[lineLength - 1]);
    replaceRange(doc, lines, pos);
    if (comparePosition(anchor, pos) !== 1) {
        selection[0] = fixPositionAfterInsert(anchor, pos, lineDiff, lastRowLength);
    }
    if (comparePosition(focus, pos) !== 1) {
        selection[1] = fixPositionAfterInsert(focus, pos, lineDiff, lastRowLength);
    }
};
/**
 * @internal
 */
const deleteEdit = (doc, selection, start, end) => {
    const [anchor, focus] = selection;
    replaceRange(doc, [], start, end);
    if (comparePosition(anchor, start) !== 1) {
        selection[0] = fixPositionAfterDelete(anchor, start, end);
    }
    if (comparePosition(focus, start) !== 1) {
        selection[1] = fixPositionAfterDelete(focus, start, end);
    }
};
/**
 * @internal
 */
const flatten = (doc, [[anchorLine, anchorOffset], [focusLine, focusOffset]]) => {
    let offsetBeforeAnchor = 0;
    let offsetBeforeFocus = 0;
    for (let i = 0; i < doc.length; i++) {
        for (const node of doc[i]) {
            const size = getNodeSize$1(node);
            if (i < anchorLine) {
                offsetBeforeAnchor += size;
            }
            if (i < focusLine) {
                offsetBeforeFocus += size;
            }
        }
    }
    return [
        [merge(...doc)],
        [
            [0, offsetBeforeAnchor + anchorOffset],
            [0, offsetBeforeFocus + focusOffset],
        ],
    ];
};

/**
 * @internal
 */
const docToString = (doc, voidToString) => {
    return doc.reduce((acc, r, i) => {
        if (i !== 0) {
            acc += "\n";
        }
        return (acc +
            r.reduce((acc, n) => acc +
                (n.type === NODE_TEXT ? n.text : voidToString ? voidToString(n) : ""), ""));
    }, "");
};
/**
 * @internal
 */
const stringToDoc = (text) => {
    return text.split("\n").map((l) => [{ type: NODE_TEXT, text: l }]);
};

const Delete = (doc, selection, [anchor, focus] = selection) => {
    if (comparePosition(anchor, focus) !== 0) {
        deleteEdit(doc, selection, ...edges(anchor, focus));
    }
};
const InsertFragment = (doc, selection, lines) => {
    Delete(doc, selection);
    insertEdit(doc, selection, lines, 
    // selection was collapsed with delete command
    selection[0]);
};
const InsertText = (doc, selection, text) => {
    InsertFragment(doc, selection, stringToDoc(text));
};
/**
 * @internal
 */
const MoveTo = (_doc, selection, anchor, focus = anchor) => {
    selection[0] = anchor;
    selection[1] = focus;
};
/**
 * @internal
 */
const Input = (doc, selection, start = [0, 0], end = [doc.length - 1, getLineSize(doc[doc.length - 1])], fragment) => {
    deleteEdit(doc, selection, start, end);
    insertEdit(doc, selection, fragment, start);
};

const MAX_HISTORY_LENGTH = 500;
const BATCH_HISTORY_TIME = 500;
/**
 * @internal
 */
const createHistory = (initialValue) => {
    let index = 0;
    let prevTime = 0;
    const now = Date.now;
    const histories = [initialValue];
    const get = () => histories[index];
    const set = (history) => {
        histories[index] = history;
    };
    const push = (history) => {
        const time = now();
        if (index !== 0 && time - prevTime < BATCH_HISTORY_TIME) {
            index--;
        }
        prevTime = time;
        histories[++index] = history;
        histories.splice(index + 1);
        if (index > MAX_HISTORY_LENGTH) {
            index--;
            histories.shift();
        }
    };
    const isUndoable = () => {
        return index > 0;
    };
    const isRedoable = () => {
        return index < histories.length - 1;
    };
    const undo = () => {
        if (isUndoable()) {
            index--;
            return get();
        }
        else {
            return;
        }
    };
    const redo = () => {
        if (isRedoable()) {
            index++;
            return get();
        }
        else {
            return;
        }
    };
    return {
        get,
        set,
        undo,
        redo,
        push,
    };
};

let walker;
let node;
let tokenType;
let startNode;
let endNode;
let isEndNodeVisited = false;
let shouldExcludeStart = false;
let shouldExcludeEnd = false;
let isBlockNode;
const SHOW_ELEMENT = 0x1;
const SHOW_TEXT = 0x4;
/** @internal */
const TOKEN_TEXT = 1;
/** @internal */
const TOKEN_VOID = 2;
/** @internal */
const TOKEN_SOFT_BREAK = 3;
/** @internal */
const TOKEN_BLOCK = 4;
const TOKEN_EMPTY_BLOCK_ANCHOR = 5;
const TOKEN_INVALID_SOFT_BREAK = 6;
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
/**
 * @internal
 */
const isTextNode = (node) => {
    return node.nodeType === TEXT_NODE;
};
/**
 * @internal
 */
const isElementNode = (node) => {
    return node.nodeType === ELEMENT_NODE;
};
/**
 * @internal
 */
const isCommentNode = (node) => {
    return node.nodeType === COMMENT_NODE;
};
// https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories
// https://html.spec.whatwg.org/multipage/dom.html#embedded-content-category
const EMBEDDED_CONTENT_TAG_NAMES = new Set([
    "EMBED",
    "IMG",
    "PICTURE",
    "AUDIO",
    "VIDEO",
    "SVG",
    "CANVAS",
    "MATH",
    "IFRAME",
    "OBJECT",
]);
/**
 * @internal
 */
const getDomNode = () => {
    return node;
};
/**
 * @internal
 */
const getNodeSize = () => {
    return tokenType === TOKEN_TEXT
        ? node.data.length
        : tokenType === TOKEN_VOID
            ? 1
            : 0;
};
const isValidSoftBreak = (node) => {
    const next = node.nextSibling;
    // This function will return false if there are no nodes after soft break.
    //
    // In contenteditable, Shift+Enter will insert soft break. \n in Chrome, <br/> in Firefox. Safari doesn't insert soft break.
    // And \n or <br/> has a special role that represents empty block in contenteditable.
    // We have to distinguish real soft breaks from empty blocks.
    //
    // There are many possible markups for soft break ([] means text node):
    // <div>[\n][abc]</div>         Shift+Enter at start of line in Chrome
    // <div><br/>[abc]</div>        Shift+Enter at start of line in Firefox
    // <div>[ab][\n][c]</div>       Shift+Enter at mid of line in Chrome
    // <div>[ab]<br/>[c]</div>      Shift+Enter at mid of line in Firefox
    // <div>[abc][\n][\n]</div>     Shift+Enter at end of line in Chrome
    // <div>[abc]<br/><br/></div>   Shift+Enter at end of line in Firefox
    // <div>[\n]<br/></div>         Shift+Enter at empty line in Chrome
    // <div><br/><br/></div>        Shift+Enter at empty line in Firefox
    //
    // And these do not include soft breaks:
    // <div><br/></div>             empty line
    // <div>[a]<br/></div>          type on empty line in Firefox
    return (!!next &&
        // svelte/angular may have comment node
        !isCommentNode(next));
};
const readNext = () => {
    while (true) {
        if (tokenType === TOKEN_VOID) {
            const current = node;
            // don't use TreeWalker.nextSibling() to support case like <body><p><a><img /></a></p><p>hello</p></body>
            while ((node = walker.nextNode())) {
                if (!current.contains(node)) {
                    break;
                }
            }
        }
        else {
            node = walker.nextNode();
        }
        tokenType = null;
        if (!node) {
            break;
        }
        if (startNode && shouldExcludeStart) {
            if (startNode.contains(node)) {
                continue;
            }
            else {
                shouldExcludeStart = false;
            }
        }
        if (endNode) {
            if (endNode.contains(node)) {
                isEndNodeVisited = true;
                if (shouldExcludeEnd) {
                    break;
                }
            }
            else {
                if (isEndNodeVisited) {
                    break;
                }
            }
        }
        if (isTextNode(node)) {
            const text = node.data;
            // Ignore empty text nodes some frameworks may generate
            if (text) {
                // Especially Shift+Enter in Chrome
                if (text === "\n") {
                    return (tokenType = isValidSoftBreak(node)
                        ? TOKEN_SOFT_BREAK
                        : TOKEN_INVALID_SOFT_BREAK);
                }
                else {
                    return (tokenType = TOKEN_TEXT);
                }
            }
        }
        else if (isElementNode(node)) {
            const tagName = node.tagName;
            if (tagName === "BR") {
                return (tokenType = isValidSoftBreak(node)
                    ? // Especially Shift+Enter in Firefox
                        TOKEN_SOFT_BREAK
                    : // Returning <div><br/></div> is necessary to anchor selection
                        TOKEN_EMPTY_BLOCK_ANCHOR);
            }
            else if (node.contentEditable === "false" ||
                EMBEDDED_CONTENT_TAG_NAMES.has(tagName)) {
                return (tokenType = TOKEN_VOID);
            }
            else if (isBlockNode(node)) {
                return (tokenType = TOKEN_BLOCK);
            }
        }
    }
};
/**
 * @internal
 */
const parse = (scopeFn, root, { _document: document, _isBlock: isBlock }, option) => {
    try {
        isBlockNode = isBlock;
        walker = document.createTreeWalker(root, SHOW_TEXT | SHOW_ELEMENT);
        if (option) {
            if (option._startNode) {
                walker.currentNode = startNode = option._startNode;
                walker.previousNode();
            }
            if (option._endNode) {
                endNode = option._endNode;
            }
            shouldExcludeStart = option._excludeStart || false;
            shouldExcludeEnd = option._excludeEnd || false;
        }
        return scopeFn(readNext);
    }
    finally {
        walker = node = tokenType = startNode = endNode = null;
        isEndNodeVisited = shouldExcludeStart = shouldExcludeEnd = false;
    }
};

/**
 * @internal
 */
const min = Math.min;
/**
 * @internal
 */
const microtask = typeof queueMicrotask === "function"
    ? queueMicrotask
    : (fn) => {
        Promise.resolve().then(fn);
    };

const SINGLE_LINE_CONTAINER_NAMES = new Set([
    // https://w3c.github.io/editing/docs/execCommand/#single-line-container
    // non-list single-line container
    "DIV",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "P",
    "PRE",
    // list single-line container
    "LI",
    "DT",
    "DD",
    // other elements for HTML paste
    "TR",
]);
/**
 * @internal
 */
const defaultIsBlockNode = (node) => {
    return SINGLE_LINE_CONTAINER_NAMES.has(node.tagName);
};

// const DOCUMENT_POSITION_DISCONNECTED = 0x01;
const DOCUMENT_POSITION_PRECEDING = 0x02;
const DOCUMENT_POSITION_FOLLOWING = 0x04;
const DOCUMENT_POSITION_CONTAINS = 0x08;
const DOCUMENT_POSITION_CONTAINED_BY = 0x10;
// const DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;
/**
 * @internal
 */
const getCurrentDocument = (node) => node.ownerDocument;
/**
 * @internal
 */
const getDOMSelection = (element) => {
    // TODO support ShadowRoot
    return getCurrentDocument(element).getSelection();
};
/**
 * @internal
 */
const getSelectionRangeInEditor = (selection, root) => {
    if (selection.rangeCount) {
        const range = selection.getRangeAt(0);
        if (root.contains(range.commonAncestorContainer)) {
            return range;
        }
    }
};
const setRangeToSelection = (root, range, backward) => {
    const selection = getDOMSelection(root);
    selection.removeAllRanges();
    selection.addRange(range);
    if (backward) {
        selection.collapseToEnd();
        selection.extend(range.startContainer, range.startOffset);
    }
};
/**
 * @internal
 */
const setSelectionToDOM = (document, root, [anchor, focus], isSingleline, config) => {
    const posDiff = comparePosition(anchor, focus);
    const isCollapsed = posDiff === 0;
    const backward = posDiff === -1;
    const start = backward ? focus : anchor;
    const end = backward ? anchor : focus;
    // special path for empty content with empty selection, necessary for placeholder
    if (start[0] === 0 &&
        start[1] === 0 &&
        isCollapsed &&
        !root.hasChildNodes()) {
        const range = document.createRange();
        range.setStart(root, 0);
        range.setEnd(root, 0);
        setRangeToSelection(root, range);
        return true;
    }
    const domStart = findPosition(root, start, isSingleline, config);
    if (!domStart) {
        return false;
    }
    const domEnd = isCollapsed
        ? domStart
        : findPosition(root, end, isSingleline, config);
    if (!domEnd) {
        return false;
    }
    // https://w3c.github.io/contentEditable/#dfn-legal-caret-positions
    const range = document.createRange();
    const [startNode, startOffset] = domStart;
    const [endNode, endOffset] = domEnd;
    // embed or br
    if (isElementNode(startNode)) {
        if (startOffset < 1) {
            range.setStartBefore(startNode);
        }
        else {
            range.setStartAfter(startNode);
        }
    }
    else {
        range.setStart(startNode, startOffset);
    }
    // embed or br
    if (isElementNode(endNode)) {
        if (endOffset < 1) {
            range.setEndBefore(endNode);
        }
        else {
            range.setEndAfter(endNode);
        }
    }
    else {
        range.setEnd(endNode, endOffset);
    }
    setRangeToSelection(root, range, backward);
    return true;
};
const findPosition = (root, [line, offset], isSingleline, config) => {
    return parse((next) => {
        while (next()) {
            const length = getNodeSize();
            if (offset <= length) {
                return [getDomNode(), offset];
            }
            offset -= length;
        }
    }, isSingleline || root.childElementCount === 0 ? root : root.children[line], config);
};
const findClosestBlockNode = (root, startNode) => {
    let temp = startNode;
    while (true) {
        const parent = temp.parentElement;
        if (parent === root) {
            break;
        }
        temp = parent;
    }
    return temp;
};
const serializePosition = (root, node, offsetAtNode, config, isArtifitialPosition, includeEnd) => {
    let row;
    let lineIndex;
    if (root === node) {
        if (!root.hasChildNodes()) {
            // for placeholder
            return [0, 0];
        }
        // special case for Ctrl+A in firefox
        const index = min(offsetAtNode, root.childNodes.length - 1);
        return serializePosition(root, root.childNodes[index], 0, config, isArtifitialPosition, index !== offsetAtNode);
    }
    else {
        const maybeBlock = findClosestBlockNode(root, node);
        if (config._isBlock(maybeBlock)) {
            row = maybeBlock;
            lineIndex = Array.prototype.indexOf.call(root.children, row);
        }
        else {
            row = root;
            lineIndex = 0;
        }
    }
    if (!isArtifitialPosition && isElementNode(node)) {
        // If anchor/focus of selection is not selectable node, it will have offset relative to its parent
        //      0  1       2               3
        // <div>aaaa<img /><span>bbbb</span></div>
        node = node.childNodes[offsetAtNode];
        offsetAtNode = 0;
    }
    return parse((next) => {
        let type;
        let offset = 0;
        while ((type = next())) {
            if (type === TOKEN_SOFT_BREAK) {
                lineIndex++;
                offset = 0;
            }
            else {
                offset += getNodeSize();
            }
        }
        return [lineIndex, offset + offsetAtNode];
    }, row, config, { _endNode: node, _excludeEnd: !includeEnd });
};
/**
 * @internal
 */
const getEmptySelectionSnapshot = () => {
    return [
        [0, 0],
        [0, 0],
    ];
};
const compareDomPosition = (a, b) => a.compareDocumentPosition(b);
/**
 * @internal
 */
const takeSelectionSnapshot = (root, config) => {
    const selection = getDOMSelection(root);
    const range = getSelectionRangeInEditor(selection, root);
    if (!range) {
        return getEmptySelectionSnapshot();
    }
    const { startOffset, startContainer, endOffset, endContainer } = range;
    const start = serializePosition(root, startContainer, startOffset, config);
    const end = startContainer === endContainer && startOffset === endOffset
        ? start
        : serializePosition(root, endContainer, endOffset, config);
    return (
    // https://stackoverflow.com/questions/9180405/detect-direction-of-user-selection-with-javascript
    (selection.anchorNode === selection.focusNode
        ? selection.anchorOffset > selection.focusOffset
        : (compareDomPosition(selection.anchorNode, selection.focusNode) &
            DOCUMENT_POSITION_PRECEDING) !==
            0)
        ? [end, start]
        : [start, end]);
};
/**
 * @internal
 */
const refToDoc = (nodes, serializeVoid) => {
    return nodes.map((l) => l.reduce((acc, n) => {
        if (typeof n === "string") {
            acc.push({ type: NODE_TEXT, text: n });
        }
        else {
            const data = serializeVoid(n);
            if (data) {
                acc.push({ type: NODE_VOID, data });
            }
        }
        return acc;
    }, []));
};
/**
 * @internal
 */
const readDom = (root, config, option) => {
    const isStartSib = option && option._isStartSibling;
    const isEndSib = option && option._isEndSibling;
    return parse((next) => {
        let type;
        let row = null;
        let text = "";
        let hasContent = false;
        const rows = [];
        const completeText = () => {
            if (text) {
                if (!row) {
                    row = [];
                }
                row.push(text);
                text = "";
            }
        };
        const completeRow = () => {
            completeText();
            if (!row && hasContent) {
                row = [];
            }
            if (row) {
                rows.push(row);
            }
            row = null;
            hasContent = false;
        };
        if (isStartSib &&
            isElementNode(option._startNode /* TODO improve type */) &&
            config._isBlock(option._startNode)) {
            rows.push([]);
        }
        while ((type = next())) {
            if (type === TOKEN_BLOCK) {
                completeRow();
            }
            else {
                hasContent = true;
                if (type === TOKEN_TEXT) {
                    text += getDomNode().data;
                }
                else if (type === TOKEN_VOID) {
                    completeText();
                    if (!row) {
                        row = [];
                    }
                    row.push(getDomNode());
                }
                else if (type === TOKEN_SOFT_BREAK) {
                    completeRow();
                }
            }
        }
        completeRow();
        if (isEndSib &&
            isElementNode(option._endNode /* TODO improve type */) &&
            config._isBlock(option._endNode)) {
            rows.push([]);
        }
        if (!rows.length) {
            // delete all
            rows.push([]);
        }
        return rows;
    }, root, config, option && {
        _startNode: option._startNode,
        _endNode: option._endNode,
        _excludeStart: isStartSib,
        _excludeEnd: isEndSib,
    });
};
/**
 * @internal
 */
const readEditAndRevert = (root, config, queue, serializeVoid) => {
    const updates = new Set();
    const addedOrRemoved = new Set();
    const prev = new Set();
    const next = new Set();
    let start;
    let end;
    let isDocStart = false;
    let isDocEnd = false;
    for (const { type, target, addedNodes, removedNodes, previousSibling, nextSibling, } of queue) {
        if (type === "childList") {
            for (const n of addedNodes) {
                addedOrRemoved.add(n);
            }
            for (const n of removedNodes) {
                addedOrRemoved.add(n);
            }
            if (previousSibling) {
                prev.add(previousSibling);
            }
            else {
                if (target === root) {
                    isDocStart = true;
                }
                else {
                    prev.add(target);
                    updates.add(target);
                }
            }
            if (nextSibling) {
                next.add(nextSibling);
            }
            else {
                if (target === root) {
                    isDocEnd = true;
                }
                else {
                    next.add(target);
                    updates.add(target);
                }
            }
        }
        else {
            prev.add(target);
            next.add(target);
            updates.add(target);
        }
    }
    if (!isDocStart) {
        for (const n of prev) {
            if (n !== root &&
                !addedOrRemoved.has(n) &&
                n.isConnected &&
                (isTextNode(n) || isElementNode(n))) {
                if (!start ||
                    compareDomPosition(start, n) &
                        (DOCUMENT_POSITION_PRECEDING | DOCUMENT_POSITION_CONTAINS)) {
                    start = n;
                }
            }
        }
    }
    if (!isDocEnd) {
        for (const n of next) {
            if (n !== root &&
                !addedOrRemoved.has(n) &&
                n.isConnected &&
                (isTextNode(n) || isElementNode(n))) {
                if (!end ||
                    compareDomPosition(end, n) &
                        (DOCUMENT_POSITION_FOLLOWING | DOCUMENT_POSITION_CONTAINS)) {
                    end = n;
                }
            }
        }
    }
    if (start && end) {
        const compare = compareDomPosition(start, end);
        if (compare & DOCUMENT_POSITION_CONTAINS) {
            start = end;
        }
        else if (compare & DOCUMENT_POSITION_CONTAINED_BY) {
            end = start;
        }
    }
    const isStartSibling = !!start &&
        ![...updates].some((n) => n === start || compareDomPosition(n, start) & DOCUMENT_POSITION_CONTAINS);
    const isEndSibling = !!end &&
        ![...updates].some((n) => n === end || compareDomPosition(n, end) & DOCUMENT_POSITION_CONTAINS);
    const afterSlicedDom = readDom(root, config, {
        _startNode: start,
        _endNode: end,
        _isStartSibling: isStartSibling,
        _isEndSibling: isEndSibling,
    });
    // Revert DOM
    let m;
    while ((m = queue.pop())) {
        if (m.type === "childList") {
            const { target, removedNodes, addedNodes, nextSibling } = m;
            for (let i = removedNodes.length - 1; i >= 0; i--) {
                target.insertBefore(removedNodes[i], nextSibling);
            }
            for (let i = addedNodes.length - 1; i >= 0; i--) {
                target.removeChild(addedNodes[i]);
            }
        }
        else {
            m.target.nodeValue = m.oldValue;
        }
    }
    return [
        start && serializePosition(root, start, 0, config, true, isStartSibling),
        end &&
            serializePosition(root, end, 0, // TODO unused
            config, true, !isEndSibling),
        refToDoc(afterSlicedDom, serializeVoid),
    ];
};
/**
 * @internal
 */
const getPointedCaretPosition = (document, root, { clientX, clientY }, config) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/caretPositionFromPoint
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/caretRangeFromPoint
    //          caretPositionFromPoint caretRangeFromPoint
    // Chrome:  128                    4
    // Firefox: 20                     -
    // Safari:  -                      5
    if (document.caretPositionFromPoint) {
        const position = document.caretPositionFromPoint(clientX, clientY);
        if (position) {
            return serializePosition(root, position.offsetNode, position.offset, config);
        }
    }
    else if (document.caretRangeFromPoint) {
        const range = document.caretRangeFromPoint(clientX, clientY);
        if (range) {
            return serializePosition(root, range.startContainer, range.startOffset, config);
        }
    }
};

/**
 * @internal
 */
const createMutationObserver = (element, onMutationIgnored) => {
    let isInputing = false;
    const queue = [];
    const process = (records) => {
        if (isInputing) {
            queue.push(...records);
        }
    };
    // https://dom.spec.whatwg.org/#interface-mutationobserver
    const mo = new MutationObserver((records) => {
        process(records);
        if (!isInputing) {
            onMutationIgnored();
        }
    });
    const sync = () => {
        process(mo.takeRecords());
    };
    mo.observe(element, {
        characterData: true,
        characterDataOldValue: true,
        childList: true,
        subtree: true,
    });
    return {
        _accept(enable) {
            if (!isInputing && enable) {
                sync();
            }
            isInputing = enable;
        },
        _flush: () => {
            sync();
            return queue.splice(0);
        },
        _dispose() {
            queue.splice(0);
            mo.disconnect();
        },
    };
};

/**
 * A function to make DOM editable.
 */
const editable = (element, { schema: { single: isSingleline, js: docToJS, void: serializeVoid, copy, paste, }, isBlock = defaultIsBlockNode, onChange, }) => {
    // https://w3c.github.io/contentEditable/
    // https://w3c.github.io/editing/docs/execCommand/
    // https://w3c.github.io/selection-api/
    const { contentEditable: prevContentEditable, role: prevRole, ariaMultiLine: prevAriaMultiLine, ariaReadOnly: prevAriaReadOnly, } = element;
    const prevWhiteSpace = element.style.whiteSpace;
    element.role = "textbox";
    // https://html.spec.whatwg.org/multipage/interaction.html#best-practices-for-in-page-editors
    element.style.whiteSpace = "pre-wrap";
    if (!isSingleline) {
        element.ariaMultiLine = "true";
    }
    let readonly = false;
    let disposed = false;
    let selectionReverted = false;
    let currentSelection = getEmptySelectionSnapshot();
    let restoreSelectionQueue = null;
    let isComposing = false;
    let hasFocus = false;
    let isDragging = false;
    const document = getCurrentDocument(element);
    const parserConfig = {
        _document: document,
        _isBlock: isBlock,
    };
    const setContentEditable = () => {
        element.contentEditable = readonly ? "false" : "true";
        element.ariaReadOnly = readonly ? "true" : null;
    };
    setContentEditable();
    const readDocAll = (root, config) => {
        return refToDoc(readDom(root, config), serializeVoid);
    };
    const commands = [];
    let history = createHistory([readDocAll(element, parserConfig), currentSelection]);
    const observer = createMutationObserver(element, () => {
        if (hasFocus) {
            // Mutation to selected DOM may change selection, so restore it.
            setSelectionToDOM(document, element, currentSelection, isSingleline, parserConfig);
            if (restoreSelectionQueue != null) {
                clearTimeout(restoreSelectionQueue);
                restoreSelectionQueue = null;
            }
        }
    });
    const tasks = new Set();
    const queueTask = (fn) => {
        if (!tasks.has(fn)) {
            tasks.add(fn);
            microtask(() => {
                tasks.delete(fn);
                fn();
            });
        }
    };
    const restoreSelectionOnTimeout = (nextSelection) => {
        currentSelection = nextSelection;
        // We set updated selection after the next rerender, because it will modify DOM and selection again.
        // However frameworks may not rerender for optimization in some case, for example if selection is updated but document is the same.
        // So we also schedule restoring on timeout for safe.
        restoreSelectionQueue = setTimeout(() => {
            setSelectionToDOM(document, element, nextSelection, isSingleline, parserConfig);
        });
    };
    const syncSelection = () => {
        currentSelection = takeSelectionSnapshot(element, parserConfig);
    };
    const flushInput = () => {
        const queue = observer._flush();
        observer._accept(false);
        if (queue.length) {
            // Get current document and selection from DOM
            const selection = takeSelectionSnapshot(element, parserConfig);
            const result = readEditAndRevert(element, parserConfig, queue, serializeVoid);
            observer._flush();
            // Restore previous selection
            // Updating selection may schedule the next selectionchange event
            // It should be ignored especially in firefox not to confuse editor state
            selectionReverted = setSelectionToDOM(document, element, currentSelection, isSingleline, parserConfig);
            execCommand(Input, ...result);
            execCommand(MoveTo, ...selection);
        }
    };
    const flushCommand = () => {
        if (commands.length) {
            let selection = [...currentSelection];
            let doc = [...history.get()[0]];
            let command;
            while ((command = commands.pop())) {
                command._fn(doc, selection, ...command._args);
            }
            if (!readonly) {
                if (isSingleline) {
                    [doc, selection] = flatten(doc, selection);
                }
                // TODO improve
                const prevDoc = history.get()[0];
                const prevSelection = currentSelection;
                if (doc.length !== prevDoc.length ||
                    doc.some((l, i) => l !== prevDoc[i])) {
                    history.set([prevDoc, prevSelection]);
                    history.push([doc, selection]);
                    onChange(docToJS(doc), selection);
                }
            }
            restoreSelectionOnTimeout(selection);
        }
    };
    const execCommand = (fn, ...args) => {
        commands.unshift({ _fn: fn, _args: args });
        queueTask(flushCommand);
    };
    const onKeyDown = (e) => {
        if (isComposing)
            return;
        if ((e.metaKey || e.ctrlKey) && !e.altKey && e.code === "KeyZ") {
            e.preventDefault();
            observer._accept(false);
            if (!readonly) {
                const nextHistory = e.shiftKey ? history.redo() : history.undo();
                if (nextHistory) {
                    onChange(docToJS(nextHistory[0]));
                    restoreSelectionOnTimeout(nextHistory[1]);
                }
            }
        }
    };
    const onInput = (() => {
        if (isComposing)
            return;
        queueTask(flushInput);
    });
    const onBeforeInput = (e) => {
        switch (e.inputType) {
            case "historyUndo": {
                e.preventDefault();
                return;
            }
            case "historyRedo": {
                e.preventDefault();
                return;
            }
            case "insertLineBreak":
            case "insertParagraph": {
                if (isSingleline) {
                    e.preventDefault();
                    return;
                }
            }
        }
        observer._accept(true);
    };
    const onCompositionStart = () => {
        isComposing = true;
    };
    const onCompositionEnd = () => {
        isComposing = false;
        queueTask(flushInput);
    };
    const onFocus = () => {
        hasFocus = true;
        syncSelection();
    };
    const onBlur = () => {
        hasFocus = false;
    };
    const onSelectionChange = () => {
        if (selectionReverted) {
            selectionReverted = false;
            return;
        }
        // Safari may dispatch selectionchange event after dragstart
        if (hasFocus && !isComposing && !isDragging) {
            syncSelection();
        }
    };
    const copySelected = (dataTransfer) => {
        syncSelection();
        if (comparePosition(...currentSelection) !== 0) {
            copy(dataTransfer, sliceDoc(history.get()[0], ...edges(...currentSelection)), () => 
            // DOM range must exist here
            getSelectionRangeInEditor(getDOMSelection(element), element).cloneContents());
        }
    };
    const insertData = (dataTransfer) => {
        execCommand(InsertFragment, paste(dataTransfer, (dom) => readDocAll(dom, parserConfig)));
    };
    const onCopy = (e) => {
        e.preventDefault();
        copySelected(e.clipboardData);
    };
    const onCut = (e) => {
        e.preventDefault();
        if (!readonly) {
            copySelected(e.clipboardData);
            execCommand(Delete);
        }
    };
    const onPaste = (e) => {
        e.preventDefault();
        insertData(e.clipboardData);
    };
    const onDrop = (e) => {
        e.preventDefault();
        const dataTransfer = e.dataTransfer;
        const droppedPosition = getPointedCaretPosition(document, element, e, parserConfig);
        if (dataTransfer && droppedPosition) {
            // move selection first to keep selection after modifications
            execCommand(MoveTo, droppedPosition);
            if (isDragging) {
                execCommand(Delete, currentSelection);
            }
            else {
                element.focus();
            }
            insertData(dataTransfer);
        }
    };
    const onDragStart = (e) => {
        isDragging = true;
        copySelected(e.dataTransfer);
    };
    const onDragEnd = () => {
        isDragging = false;
    };
    document.addEventListener("selectionchange", onSelectionChange);
    element.addEventListener("keydown", onKeyDown);
    element.addEventListener("input", onInput);
    element.addEventListener("beforeinput", onBeforeInput);
    element.addEventListener("compositionstart", onCompositionStart);
    element.addEventListener("compositionend", onCompositionEnd);
    element.addEventListener("focus", onFocus);
    element.addEventListener("blur", onBlur);
    element.addEventListener("copy", onCopy);
    element.addEventListener("cut", onCut);
    element.addEventListener("paste", onPaste);
    element.addEventListener("drop", onDrop);
    element.addEventListener("dragstart", onDragStart);
    element.addEventListener("dragend", onDragEnd);
    return {
        dispose: () => {
            if (disposed)
                return;
            disposed = true;
            element.contentEditable = prevContentEditable;
            element.role = prevRole;
            element.ariaMultiLine = prevAriaMultiLine;
            element.ariaReadOnly = prevAriaReadOnly;
            element.style.whiteSpace = prevWhiteSpace;
            observer._dispose();
            document.removeEventListener("selectionchange", onSelectionChange);
            element.removeEventListener("keydown", onKeyDown);
            element.removeEventListener("input", onInput);
            element.removeEventListener("beforeinput", onBeforeInput);
            element.removeEventListener("compositionstart", onCompositionStart);
            element.removeEventListener("compositionend", onCompositionEnd);
            element.removeEventListener("focus", onFocus);
            element.removeEventListener("blur", onBlur);
            element.removeEventListener("copy", onCopy);
            element.removeEventListener("cut", onCut);
            element.removeEventListener("paste", onPaste);
            element.removeEventListener("drop", onDrop);
            element.removeEventListener("dragstart", onDragStart);
            element.removeEventListener("dragend", onDragEnd);
        },
        command: execCommand,
        readonly: (value) => {
            readonly = value;
            setContentEditable();
        },
        syncSelection,
        resetHistory: () => {
            history = createHistory([
                readDocAll(element, parserConfig),
                getEmptySelectionSnapshot(),
            ]);
        },
    };
};

/**
 * Defines plain text schema.
 */
const plainSchema = ({ multiline, } = {}) => {
    return {
        single: !multiline,
        js: docToString,
        void: () => { }, // not supported
        copy: (dataTransfer, data) => {
            dataTransfer.setData("text/plain", docToString(data));
        },
        paste: (dataTransfer) => {
            return stringToDoc(dataTransfer.getData("text/plain"));
        },
    };
};

const emptyString = () => "";
const voidNode = ({ is, data, plain = emptyString, }) => {
    return {
        is,
        data,
        plain,
    };
};
/**
 * Defines structured text schema.
 */
const schema = ({ multiline, void: voids = {}, }) => {
    const voidSerializers = Object.entries(voids);
    const textCache = new WeakMap();
    // TODO replace VoidNodeData with VoidNode
    const voidCache = new WeakMap();
    const serializeRow = (r) => {
        return r.reduce((acc, t) => {
            if (t.type === NODE_TEXT) {
                let text = textCache.get(t);
                if (!text) {
                    textCache.set(t, (text = { type: "text", text: t.text }));
                }
                acc.push(text);
            }
            else {
                let voidCacheItem = voidCache.get(t.data);
                if (!voidCacheItem) {
                    const data = t.data;
                    voidCacheItem = {
                        type: t.type,
                        data: { ...data },
                    };
                    voidCache.set(data, voidCacheItem);
                }
                acc.push(voidCacheItem);
            }
            return acc;
        }, []);
    };
    return {
        single: !multiline,
        js: multiline
            ? (doc) => {
                return doc.map(serializeRow);
            }
            : (doc) => {
                return serializeRow(doc[0]); // TODO improve type
            },
        void: (element) => {
            for (const [type, s] of voidSerializers) {
                if (s.is(element)) {
                    const data = s.data(element);
                    // TODO improve
                    voidCache.set(data, {
                        type,
                        data: { ...data },
                    });
                    return data;
                }
            }
            return;
        },
        copy: (dataTransfer, doc, dom) => {
            dataTransfer.setData("text/plain", docToString(doc, (node) => {
                const voidNode = voidCache.get(node.data);
                return voids[voidNode.type].plain(node.data);
            }));
            const wrapper = document.createElement("div");
            wrapper.appendChild(dom());
            dataTransfer.setData("text/html", wrapper.innerHTML);
        },
        paste: (dataTransfer, read) => {
            const html = dataTransfer.getData("text/html");
            if (html) {
                let dom = new DOMParser().parseFromString(html, "text/html").body;
                let isWindowsCopy = false;
                // https://github.com/w3c/clipboard-apis/issues/193
                for (const n of [...dom.childNodes]) {
                    if (isCommentNode(n)) {
                        if (n.data === "StartFragment") {
                            isWindowsCopy = true;
                            dom = new DocumentFragment();
                        }
                        else if (n.data === "EndFragment") {
                            isWindowsCopy = false;
                        }
                    }
                    else if (isWindowsCopy) {
                        dom.appendChild(n);
                    }
                }
                return read(dom);
            }
            return stringToDoc(dataTransfer.getData("text/plain"));
        },
    };
};

export { Delete, InsertFragment, InsertText, editable, plainSchema, schema, voidNode };
//# sourceMappingURL=index.mjs.map
