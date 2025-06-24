import { useRemarkable } from '@myshell-run/common-ui';
import { Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import { LogViewer, LogViewerSearch } from '@patternfly/react-log-viewer';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import './simple-log-viewer.css';
import { SimpleLogViewerModel } from './simple-log-viewer.model';
// import '@patternfly/react-core/dist/styles/base.css';

export const SimpleLogViewer =
  //  React.FC<{ id: string; text: string }>
  observer<{
    text: string;
    id?: string;
  }>((props) => {
    const model = useRemarkable(SimpleLogViewerModel, props.id);

    useEffect(() => {
      console.log('only run once');
      model.setText(props.text as string);
    }, []);

    // TODO wrapper 在 search 不能定位（除非 log 很短）所以先简化这个组件吧
    // const [isTextWrapped, setIsTextWrapped] = useState(true);
    // const [isLogViewerExpanded, setIsLogViewerExpanded] = useState(true);

    // https://legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
    // const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    return (
      <LogViewer
        isTextWrapped={false}
        // height={isLogViewerExpanded ? 300 : 90}
        height={120}
        data={model.text.split('<br>')}
        toolbar={
          <Toolbar>
            <ToolbarContent>
              <ToolbarItem>
                <LogViewerSearch minSearchChars={1} placeholder="Search" />
              </ToolbarItem>
              {/*               <ToolbarItem>
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
              </ToolbarItem> */}
              {/* <ToolbarItem alignSelf="center">
                <Checkbox
                  label="Wrap text"
                  aria-label="wrap text checkbox"
                  isChecked={isTextWrapped}
                  id="wrap-text-checkbox"
                  onChange={(_event, value) => {
                    setIsTextWrapped(value);
                    setTimeout(forceUpdate, 0);
                  }}
                />
              </ToolbarItem> */}
            </ToolbarContent>
          </Toolbar>
        }
      />
    );
  });
