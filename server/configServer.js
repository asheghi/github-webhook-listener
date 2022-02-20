const {join} = require('path');
module.exports = {
  dataDir: join(process.cwd(), 'data'),
  executionsDir: join(this.dataDir, 'executions'),

}
