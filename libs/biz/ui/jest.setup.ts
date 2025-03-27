import { TextEncoder, TextDecoder } from 'util';
import ResizeObserver from 'resize-observer-polyfill';
Object.assign(global, { TextDecoder, TextEncoder });
global.ResizeObserver = ResizeObserver;
