const { merge } = require('mochawesome-merge');
const fs = require('fs');

merge({
  files: ['cypress/reports/mochawesome*.json']
}).then(report => {
  fs.writeFileSync(
    'cypress/reports/output.json',
    JSON.stringify(report, null, 2),
    'utf8'
  );
  console.log('Reports merged to cypress/reports/output.json');
}).catch(err => {
  console.error('Merge failed:', err);
  process.exit(1);
});
