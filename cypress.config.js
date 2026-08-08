const { defineConfig } = require("cypress");
const installLogsPrinter = require('cypress-terminal-report/src/installLogsPrinter');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true
  },
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    setupNodeEvents(on, config) {
      installLogsPrinter(on, {
        printLogsToConsole: 'always',
        printLogsToFile: 'always',
        outputRoot: 'cypress/logs/',
        outputTarget: {
          'out.txt': 'txt',
          'out.json': 'json',
        }
      });
    }
  }
});