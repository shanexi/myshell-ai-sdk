// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import '../../../tailwind-cfg/styles.css';
// storybook 可以不用手动指定 source
// import '../src/styles.css';
import './preview.css';
import type { Preview, ReactRenderer } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

import { configure } from 'mobx';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

configure({
  enforceActions: 'never',
});

export default preview;
