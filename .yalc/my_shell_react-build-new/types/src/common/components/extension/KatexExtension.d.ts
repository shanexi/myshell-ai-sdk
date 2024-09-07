import { type KatexOptions } from 'katex';
import 'katex/dist/katex.min.css';
import type { MarkedExtension } from 'marked';
export default function (options?: KatexOptions): MarkedExtension;
export declare const renderKatex: (text: string, options?: KatexOptions) => string;
