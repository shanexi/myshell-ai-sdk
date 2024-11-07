import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

const config = nxE2EPreset(__dirname);
// console.log(config)
export default defineConfig({
  e2e: {
    ...config,
    experimentalStudio: true,
  },
});
