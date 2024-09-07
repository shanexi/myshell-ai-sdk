interface P {
    articleSeoId?: string;
    articleId?: string;
    articleName?: string;
    clickCallback?: (clickArea: string) => void;
}
export default function ArticleShare({ articleSeoId, articleId, articleName, clickCallback }: P): import("react/jsx-runtime").JSX.Element;
export {};
