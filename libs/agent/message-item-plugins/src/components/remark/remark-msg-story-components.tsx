import { useEffect, useState } from 'react';
import { ReplyMsg } from '../reply-msg';
import checklistStory from './checklist-story.md';

export const ChecklistStory = () => {
  const lines = checklistStory.split('\n').map((line: string) => '\n' + line);
  const [text, setText] = useState(lines[0]);
  useEffect(() => {
    let currentLine = 1;
    const timer = setInterval(() => {
      if (currentLine < lines.length) {
        setText((prev: string) => {
          const txt = prev + lines[currentLine];
          currentLine++;
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
