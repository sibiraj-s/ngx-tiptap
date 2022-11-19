import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200/#/',
    setupNodeEvents(on, config) { // eslint-disable-line @typescript-eslint/no-unused-vars
      // implement node event listeners here
    },
    video: false,
  },
});
