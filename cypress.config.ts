import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    BURGER_API_URL:
      process.env.BURGER_API_URL || 'https://norma.education-services.ru/api'
  },
  e2e: {
    baseUrl: 'http://localhost:4000',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    video: false,
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      return config;
    }
  },
  retries: { runMode: 2, openMode: 0 },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    }
  }
});
