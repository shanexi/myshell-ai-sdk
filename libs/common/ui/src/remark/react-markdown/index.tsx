import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useState,
  ComponentType,
  JSX,
} from 'react';
import { unified, PluggableList, Processor } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { VFile } from 'vfile';
import { visit, BuildVisitor } from 'unist-util-visit';
import { toJsxRuntime } from '../hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { urlAttributes } from 'html-url-attributes';
import { unreachable } from 'devlop';

// Import types from hast, mdast and remark-rehype
import type { Element, Nodes, Parents, Root } from 'hast';
import type { Root as MdastRoot } from 'mdast';
import type { Options as RemarkRehypeOptions } from 'remark-rehype';

// Type definitions
export type AllowElement = (
  element: Readonly<Element>,
  index: number,
  parent: Readonly<Parents> | undefined,
) => boolean | null | undefined;

export type ExtraProps = {
  node?: Element | undefined;
};

export type Components = {
  [Key in keyof JSX.IntrinsicElements]?:
    | ComponentType<JSX.IntrinsicElements[Key] & ExtraProps>
    | keyof JSX.IntrinsicElements;
};

export type UrlTransform = (
  url: string,
  key: string,
  node: Readonly<Element>,
) => string | null | undefined;

export interface Options {
  allowElement?: AllowElement | null | undefined;
  allowedElements?: ReadonlyArray<string> | null | undefined;
  children?: string | null | undefined;
  components?: Components | null | undefined;
  disallowedElements?: ReadonlyArray<string> | null | undefined;
  rehypePlugins?: PluggableList | null | undefined;
  remarkPlugins?: PluggableList | null | undefined;
  remarkRehypeOptions?: Readonly<RemarkRehypeOptions> | null | undefined;
  skipHtml?: boolean | null | undefined;
  unwrapDisallowed?: boolean | null | undefined;
  urlTransform?: UrlTransform | null | undefined;
}

export interface HooksOptionsOnly {
  fallback?: ReactNode | null | undefined;
}

export type HooksOptions = Options & HooksOptionsOnly;

type Deprecation = {
  from: string;
  id: string;
  to?: keyof Options;
};

// Constants
const changelog =
  'https://github.com/remarkjs/react-markdown/blob/main/changelog.md';
const emptyPlugins: PluggableList = [];
const emptyRemarkRehypeOptions: Readonly<RemarkRehypeOptions> = {
  allowDangerousHtml: true,
};
const safeProtocol = /^(https?|ircs?|mailto|xmpp)$/i;

// Deprecation warnings
const deprecations: ReadonlyArray<Readonly<Deprecation>> = [
  { from: 'astPlugins', id: 'remove-buggy-html-in-markdown-parser' },
  { from: 'allowDangerousHtml', id: 'remove-buggy-html-in-markdown-parser' },
  {
    from: 'allowNode',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes',
    to: 'allowElement',
  },
  {
    from: 'allowedTypes',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes',
    to: 'allowedElements',
  },
  { from: 'className', id: 'remove-classname' },
  {
    from: 'disallowedTypes',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes',
    to: 'disallowedElements',
  },
  { from: 'escapeHtml', id: 'remove-buggy-html-in-markdown-parser' },
  { from: 'includeElementIndex', id: '#remove-includeelementindex' },
  {
    from: 'includeNodeIndex',
    id: 'change-includenodeindex-to-includeelementindex',
  },
  { from: 'linkTarget', id: 'remove-linktarget' },
  {
    from: 'plugins',
    id: 'change-plugins-to-remarkplugins',
    to: 'remarkPlugins',
  },
  { from: 'rawSourcePos', id: '#remove-rawsourcepos' },
  { from: 'renderers', id: 'change-renderers-to-components', to: 'components' },
  { from: 'source', id: 'change-source-to-children', to: 'children' },
  { from: 'sourcePos', id: '#remove-sourcepos' },
  { from: 'transformImageUri', id: '#add-urltransform', to: 'urlTransform' },
  { from: 'transformLinkUri', id: '#add-urltransform', to: 'urlTransform' },
];

/**
 * Component to render markdown.
 *
 * This is a synchronous component.
 * When using async plugins, see MarkdownAsync or MarkdownHooks.
 */
export function Markdown(options: Readonly<Options>): ReactElement {
  const processor = createProcessor(options);
  const file = createFile(options);
  return post(processor.runSync(processor.parse(file), file), options);
}

/**
 * Component to render markdown with support for async plugins
 * through async/await.
 *
 * Components returning promises are supported on the server.
 * For async support on the client, see MarkdownHooks.
 */
export async function MarkdownAsync(
  options: Readonly<Options>,
): Promise<ReactElement> {
  const processor = createProcessor(options);
  const file = createFile(options);
  const tree = await processor.run(processor.parse(file), file);
  return post(tree, options);
}

/**
 * Component to render markdown with support for async plugins through hooks.
 *
 * This uses useEffect and useState hooks.
 * Hooks run on the client and do not immediately render something.
 * For async support on the server, see MarkdownAsync.
 */
export function MarkdownHooks(options: Readonly<HooksOptions>): ReactNode {
  const processor = createProcessor(options);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [tree, setTree] = useState<Root | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    const file = createFile(options);

    processor.run(processor.parse(file), file, (error, tree) => {
      if (!cancelled) {
        setError(error as Error | undefined);
        setTree(tree as Root | undefined);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [
    options.children,
    options.rehypePlugins,
    options.remarkPlugins,
    options.remarkRehypeOptions,
  ]);

  if (error) throw error;

  return tree ? post(tree, options) : options.fallback;
}

/**
 * Set up the unified processor.
 */
function createProcessor(
  options: Readonly<Options>,
): Processor<MdastRoot, MdastRoot, Root, undefined, undefined> {
  const rehypePlugins = options.rehypePlugins || emptyPlugins;
  const remarkPlugins = options.remarkPlugins || emptyPlugins;
  const remarkRehypeOptions = options.remarkRehypeOptions
    ? { ...options.remarkRehypeOptions, ...emptyRemarkRehypeOptions }
    : emptyRemarkRehypeOptions;

  const processor = unified()
    .use(remarkParse)
    .use(remarkPlugins)
    .use(remarkRehype, remarkRehypeOptions)
    .use(rehypePlugins);

  return processor;
}

/**
 * Set up the virtual file.
 */
function createFile(options: Readonly<Options>): VFile {
  const children = options.children || '';
  const file = new VFile();

  if (typeof children === 'string') {
    file.value = children;
  } else {
    unreachable(
      'Unexpected value `' +
        children +
        '` for `children` prop, expected `string`',
    );
  }

  return file;
}

/**
 * Process the result from unified some more.
 */
export function post(tree: Nodes, options: Readonly<Options>): ReactElement {
  const allowedElements = options.allowedElements;
  const allowElement = options.allowElement;
  const components = options.components;
  const disallowedElements = options.disallowedElements;
  const skipHtml = options.skipHtml;
  const unwrapDisallowed = options.unwrapDisallowed;
  const urlTransform = options.urlTransform || defaultUrlTransform;

  for (const deprecation of deprecations) {
    if (Object.prototype.hasOwnProperty.call(options, deprecation.from)) {
      unreachable(
        'Unexpected `' +
          deprecation.from +
          '` prop, ' +
          (deprecation.to
            ? 'use `' + deprecation.to + '` instead'
            : 'remove it') +
          ' (see <' +
          changelog +
          '#' +
          deprecation.id +
          '> for more info)',
      );
    }
  }

  if (allowedElements && disallowedElements) {
    unreachable(
      'Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other',
    );
  }

  visit(tree, transform);

  return toJsxRuntime(tree, {
    Fragment,
    components,
    ignoreInvalidStyle: true,
    jsx,
    jsxs,
    passKeys: true,
    passNode: true,
  });

  function transform(
    node: Nodes,
    index: number | undefined,
    parent: Parents | undefined,
  ): number | void {
    if (node.type === 'raw' && parent && typeof index === 'number') {
      if (skipHtml) {
        parent.children.splice(index, 1);
      } else {
        parent.children[index] = { type: 'text', value: node.value };
      }

      return index;
    }

    if (node.type === 'element') {
      let key: string;

      for (key in urlAttributes) {
        if (
          Object.prototype.hasOwnProperty.call(urlAttributes, key) &&
          Object.prototype.hasOwnProperty.call(node.properties, key)
        ) {
          const value = node.properties[key];
          const test = urlAttributes[key];
          if (test === null || test.includes(node.tagName)) {
            node.properties[key] = urlTransform(String(value || ''), key, node);
          }
        }
      }
    }

    if (node.type === 'element') {
      let remove = allowedElements
        ? !allowedElements.includes(node.tagName)
        : disallowedElements
          ? disallowedElements.includes(node.tagName)
          : false;

      if (!remove && allowElement && typeof index === 'number') {
        remove = !allowElement(node, index, parent);
      }

      if (remove && parent && typeof index === 'number') {
        if (unwrapDisallowed && node.children) {
          parent.children.splice(index, 1, ...node.children);
        } else {
          parent.children.splice(index, 1);
        }

        return index;
      }
    }
  }
}

/**
 * Make a URL safe.
 */
export function defaultUrlTransform(value: string): string {
  const colon = value.indexOf(':');
  const questionMark = value.indexOf('?');
  const numberSign = value.indexOf('#');
  const slash = value.indexOf('/');

  if (
    // If there is no protocol, it's relative.
    colon === -1 ||
    // If the first colon is after a `?`, `#`, or `/`, it's not a protocol.
    (slash !== -1 && colon > slash) ||
    (questionMark !== -1 && colon > questionMark) ||
    (numberSign !== -1 && colon > numberSign) ||
    // It is a protocol, it should be allowed.
    safeProtocol.test(value.slice(0, colon))
  ) {
    return value;
  }

  return '';
}

// Default export
export default Markdown;
