import { Virtuoso } from 'react-virtuoso';
import ReactDOMServer from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { render, screen } from '@testing-library/react';

import {
  type VirtuosoMessageListMethods,
  VirtuosoMessageListLicense,
  VirtuosoMessageList,
  VirtuosoMessageListTestingContext,
} from '@virtuoso.dev/message-list';

interface Message {
  key: string;
  text: string;
  user: 'me' | 'other';
}

function SampleComponent() {
  return (
    <VirtuosoMessageListTestingContext.Provider
      value={{ itemHeight: 100, viewportHeight: 400 }}
    >
      <VirtuosoMessageListLicense licenseKey="">
        <VirtuosoMessageList
          style={{ height: 400 }}
          initialData={Array.from({ length: 100 })}
          initialLocation={{ index: 'LAST', align: 'start' }}
          ItemContent={({ index }) => <div role="item">{index}</div>}
        />
      </VirtuosoMessageListLicense>
    </VirtuosoMessageListTestingContext.Provider>
  );
}

describe('ssr', () => {
  it('should render successfully', () => {
    const html = ReactDOMServer.renderToString(
      <Virtuoso id="root" initialItemCount={30} totalCount={20000} />,
    );
    const { document } = new JSDOM(html).window;
    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<div data-testid="virtuoso-scroller" data-virtuoso-scroller="true" style="height:100%;outline:none;overflow-y:auto;position:relative;-webkit-overflow-scrolling:touch" tabindex="0" id="root"><div data-viewport-type="element" style="height:100%;position:absolute;top:0;width:100%"><div data-testid="virtuoso-item-list" style="box-sizing:border-box;margin-top:0;padding-bottom:0;padding-top:0"><div data-index="0" data-item-index="0" data-known-size="0" style="overflow-anchor:none">Item 0</div><div data-index="1" data-item-index="1" data-known-size="0" style="overflow-anchor:none">Item 1</div><div data-index="2" data-item-index="2" data-known-size="0" style="overflow-anchor:none">Item 2</div><div data-index="3" data-item-index="3" data-known-size="0" style="overflow-anchor:none">Item 3</div><div data-index="4" data-item-index="4" data-known-size="0" style="overflow-anchor:none">Item 4</div><div data-index="5" data-item-index="5" data-known-size="0" style="overflow-anchor:none">Item 5</div><div data-index="6" data-item-index="6" data-known-size="0" style="overflow-anchor:none">Item 6</div><div data-index="7" data-item-index="7" data-known-size="0" style="overflow-anchor:none">Item 7</div><div data-index="8" data-item-index="8" data-known-size="0" style="overflow-anchor:none">Item 8</div><div data-index="9" data-item-index="9" data-known-size="0" style="overflow-anchor:none">Item 9</div><div data-index="10" data-item-index="10" data-known-size="0" style="overflow-anchor:none">Item 10</div><div data-index="11" data-item-index="11" data-known-size="0" style="overflow-anchor:none">Item 11</div><div data-index="12" data-item-index="12" data-known-size="0" style="overflow-anchor:none">Item 12</div><div data-index="13" data-item-index="13" data-known-size="0" style="overflow-anchor:none">Item 13</div><div data-index="14" data-item-index="14" data-known-size="0" style="overflow-anchor:none">Item 14</div><div data-index="15" data-item-index="15" data-known-size="0" style="overflow-anchor:none">Item 15</div><div data-index="16" data-item-index="16" data-known-size="0" style="overflow-anchor:none">Item 16</div><div data-index="17" data-item-index="17" data-known-size="0" style="overflow-anchor:none">Item 17</div><div data-index="18" data-item-index="18" data-known-size="0" style="overflow-anchor:none">Item 18</div><div data-index="19" data-item-index="19" data-known-size="0" style="overflow-anchor:none">Item 19</div><div data-index="20" data-item-index="20" data-known-size="0" style="overflow-anchor:none">Item 20</div><div data-index="21" data-item-index="21" data-known-size="0" style="overflow-anchor:none">Item 21</div><div data-index="22" data-item-index="22" data-known-size="0" style="overflow-anchor:none">Item 22</div><div data-index="23" data-item-index="23" data-known-size="0" style="overflow-anchor:none">Item 23</div><div data-index="24" data-item-index="24" data-known-size="0" style="overflow-anchor:none">Item 24</div><div data-index="25" data-item-index="25" data-known-size="0" style="overflow-anchor:none">Item 25</div><div data-index="26" data-item-index="26" data-known-size="0" style="overflow-anchor:none">Item 26</div><div data-index="27" data-item-index="27" data-known-size="0" style="overflow-anchor:none">Item 27</div><div data-index="28" data-item-index="28" data-known-size="0" style="overflow-anchor:none">Item 28</div><div data-index="29" data-item-index="29" data-known-size="0" style="overflow-anchor:none">Item 29</div></div></div></div>"`,
    );
  });

  it('message list', () => {
    const html = ReactDOMServer.renderToString(<SampleComponent />);
    const { document } = new JSDOM(html).window;
    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<div data-testid="virtuoso-scroller" style="overflow-y:scroll;box-sizing:border-box;height:400px"><div data-testid="virtuoso-list" style="box-sizing:content-box;height:0;padding-bottom:0;overflow-anchor:none;margin-top:0;position:relative;transform:translateY(0px)"><div data-index="99" data-known-size="0" style="overflow-anchor:none;position:absolute;width:100%;top:0"><div role="item">99</div></div></div></div>"`,
    );
  });

  it('works', async () => {
    render(<SampleComponent />);
    await screen.findAllByRole('item');
    expect(screen.getAllByRole('item')).toHaveLength(4);
  });
});
