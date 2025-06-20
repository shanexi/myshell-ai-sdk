// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import '../../../tailwind-cfg/styles.css';
// import '@myshell-run/tailwind-cfg/styles.css';

import React from 'react';
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
