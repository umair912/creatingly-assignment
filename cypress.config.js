const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1000,
  viewportWidth: 1280,
  chromeWebSecurity: true,
  defaultCommandTimeout: 60000,
  requestTimeout: 30000,
  responseTimeout: 30000,
  pageLoadTimeout: 30000,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  retries: 0,
  video: false,
  e2e: {
    baseUrl: "https://dev.platform.creatingly.com/apps/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
