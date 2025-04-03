import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdown = `
# This is perfect!

- [ ] This is a task
- [x] This is a completed task
- [ ] This is another task

`;

export const MdViewer = () => {
  return (
    <article className="prose dark:prose-invert">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </article>
  );
};
