import {
  Checkbox,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Button,
} from '@patternfly/react-core';
import { LogViewer, LogViewerSearch } from '@patternfly/react-log-viewer';
import { useReducer, useState } from 'react';
import { AgentMessage } from '../types';
import '@patternfly/react-core/dist/styles/base.css';

export const SimpleLogViewer: React.FC<AgentMessage> = ({ text }) => {
  const [isTextWrapped, setIsTextWrapped] = useState(false);
  const [isLogViewerExpanded, setIsLogViewerExpanded] = useState(false);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  return (
    <LogViewer
      isTextWrapped={isTextWrapped}
      height={isLogViewerExpanded ? 300 : 90}
      data={text}
      toolbar={
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <LogViewerSearch minSearchChars={1} placeholder="Search" />
            </ToolbarItem>
            <ToolbarItem>
              <Button
                onClick={() => {
                  setIsLogViewerExpanded(!isLogViewerExpanded);
                  // 这个组件在改变 height 需要 force update 下，否则 react-window 的高度不会变
                  setTimeout(forceUpdate, 0);
                }}
                variant="control"
              >
                {isLogViewerExpanded ? 'Reduce height' : 'Increase Height'}
              </Button>
            </ToolbarItem>
            <ToolbarItem alignSelf="center">
              <Checkbox
                label="Wrap text"
                aria-label="wrap text checkbox"
                isChecked={isTextWrapped}
                id="wrap-text-checkbox"
                onChange={(_event, value) => setIsTextWrapped(value)}
              />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      }
    />
  );
};
