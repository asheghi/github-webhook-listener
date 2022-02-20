const Fson = require('fson-db');
const {join} = require("path");
const {exec} = require('child_process');

function getDB(name) {
  const dbPath = join(__dirname, '../../../data/executions', name);
  return Fson(dbPath);
}

module.exports.ExecService = {
  async execute(name, script, cwd) {
    const db = getDB(name)
    let date = new Date();
    const id = date.getTime();
    db[id] = {name, date: date.toLocaleString(),exec:{}};
    const history = db[id];

    for (let i = 0; i < script.length; i++) {
      const command = script[i];
      try {
        await new Promise((resolve, reject) => {
          exec(command, {cwd,}, function (err, stdout, stderr) {
            console.log(err, stdout, stderr);
            history.exec[command] = {err, stdout, stderr};
            if (err) {
              //failed to run the command
              reject(err);
            } else {
              resolve();
            }
          });
        })
      } catch (e) {
        break;
      }
    }
  },
  getHistoryList(name) {
    const db = getDB(name);
    return Object.keys(db);
  },
  getHistoryItem(name,id){
    const db = getDB(name);
    return db[id];
  }
}
