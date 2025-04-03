import { useEffect, useState } from 'react';
import { RemarkMsg } from '@myshell-run/ui-primitives';

export const CounterStory = () => {
  const lines = [
    `::x-timer{#abc timeLeft=100}`,
    '\n::p[hello world]{.not-prose}',
    `\n::x-timer{#abc timeLeft=5}`,
  ];
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
  const lines = [
    '\n::p[hello world]{.not-prose}',
    `\n::img{#abc src=https://static.myshell.run/mini.PNG width=400}`,
    `\n::img{#abc src=https://static.myshell.run/small.PNG width=400}`,
    `\n::img{#abc src=https://static.myshell.run/medium.PNG width=400}`,
    `\n::img{#abc src=https://static.myshell.run/big.PNG width=400}`,
  ];
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
