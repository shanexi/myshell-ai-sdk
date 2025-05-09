// 参考 https://github.com/orgs/mdx-js/discussions/2220

import { useState, useEffect } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';

import type { FC, ReactNode } from 'react';
import type { EvaluateOptions } from '@mdx-js/mdx';
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/mdx/types.d.ts#L96
import { MDXProps } from './type';

type ReactMDXContent = (props: MDXProps) => ReactNode;
type Runtime = Pick<EvaluateOptions, 'jsx' | 'jsxs' | 'Fragment'>;

const runtime = { jsx, jsxs, Fragment } as Runtime;

const components = {
  Demo: (props: MDXProps) => <h1>This is a demo component</h1>,
};

export const Preview: FC<{ source?: string }> = ({ source = '' }) => {
  const [MdxContent, setMdxContent] = useState<ReactMDXContent>(
    () => () => null,
  );

  useEffect(() => {
    console.time('evaluate');
    evaluate(source, runtime).then((r) => {
      console.timeEnd('evaluate');
      setMdxContent(() => r.default);
    });
  }, [source]);

  return <MdxContent components={components} />;
};
