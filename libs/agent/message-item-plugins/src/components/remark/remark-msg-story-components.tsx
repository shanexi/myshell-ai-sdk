import { useEffect, useState } from 'react';
import { ReplyMsg } from '../reply-msg';
import checklistStory from './checklist-story.md';

export const ChecklistStory = () => {
  const split = [5, 6, 7, 8, 9, 10];

  const lines = checklistStory.split('\n').map((line: string) => '\n' + line);
  const [text, setText] = useState(lines.slice(0, split[0]).join(''));
  console.log([0, split[0]]);
  useEffect(() => {
    let splitIdx = 1;
    const timer = setInterval(() => {
      if (splitIdx < split.length) {
        setText((prev: string) => {
          console.log([split[splitIdx - 1], split[splitIdx]]);
          const txt =
            prev + lines.slice(split[splitIdx - 1], split[splitIdx]).join('');
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
