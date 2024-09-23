import { render } from '@testing-library/react';

import GlifCanvas from './glif-canvas';

describe('GlifCanvas', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GlifCanvas />);
    expect(baseElement).toBeTruthy();
  });
});
