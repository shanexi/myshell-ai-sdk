import { useEffect, useState } from 'react';
import { RemarkMsg } from '@myshell-run/ui-primitives';
import imageStory from './image-story.md';
import counterStory from './counter-story.md';

export const CounterStory = () => {
  const lines = counterStory.split('\n').map((line: string) => '\n' + line);
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
    }, 3000);

    return () => clearInterval(timer);
  }, []);
  console.log(text);
  return <RemarkMsg key="abc" user="me" text={text} />;
};

export const ImageStory = () => {
  const lines = imageStory.split('\n').map((line: string) => '\n' + line);
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
  return <RemarkMsg key="abc" user="me" text={text} />;
};
