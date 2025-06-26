import { useEffect, useState } from 'react';
import { OWN_MESSAGE_TYPE, REPLY_MESSAGE_TYPE } from '../../types';
import { ReplyMsg } from '../reply/reply-msg';
import checklistStory from './checklist-story.md';
import pollingMsgStory from './polling-msg-story.md';
import thinkStory from './think-story.md';

export const RemarkStory: React.FC<{ text: string }> = ({ text }) => {
  return (
    <ReplyMsg key="abc" user="other" type={REPLY_MESSAGE_TYPE} text={text} />
  );
};

export const ChecklistStory = () => {
  const lines = checklistStory.split('<!-- next -->\n');
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
  return (
    <ReplyMsg key="abc" user="other" type={REPLY_MESSAGE_TYPE} text={text} />
  );
};

export const PollingMsgStory = () => {
  const lines = pollingMsgStory.split('<!-- next -->\n');
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
  return (
    <ReplyMsg key="abc" user="other" type={REPLY_MESSAGE_TYPE} text={text} />
  );
};

export const ThinkStory = () => {
  const lines = thinkStory.split('<!-- next -->\n');
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
  return (
    <ReplyMsg key="abc" user="other" type={REPLY_MESSAGE_TYPE} text={text} />
  );
};
