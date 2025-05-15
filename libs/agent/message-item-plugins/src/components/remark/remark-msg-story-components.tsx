import { useEffect, useState } from 'react';
import { ReplyMsg } from '../reply-msg';
import checklistStory from './checklist-story.md';

export const ChecklistStory = () => {
  const split = [5];

  const lines = checklistStory.split('\n').map((line: string) => '\n' + line);
  const [text, setText] = useState(lines.slice(0, split[split[0]]).join(''));
  useEffect(() => {
    let splitIdx = 1;
    const timer = setInterval(() => {
      if (splitIdx < split.length) {
        setText((prev: string) => {
          const txt = prev + lines[split[splitIdx]];
          splitIdx++;
          return txt;
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  console.log(text);
  return <ReplyMsg key="abc" user="other" text={text} />;
};
