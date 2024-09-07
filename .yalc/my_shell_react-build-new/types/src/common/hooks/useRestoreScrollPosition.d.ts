import { RefObject } from 'react';
export declare const useRestoreScrollPosition: (scrollRef: RefObject<HTMLElement>, isScrollTop?: boolean, scollPathName?: string) => void;
export declare const useMemoScrollPosition: (scrollRef?: RefObject<HTMLElement>, scollPathName?: string) => (id?: string) => void;
