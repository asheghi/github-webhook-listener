const Fson = require('fson-db');
const {join} = require("path");
const {exec} = require('child_process');

function getDB(name) {
  const dbPath = join(__dirname, '../../../data/executions', name);
  return Fson(dbPath);
}

module.exports.ExecService = {
  async execute({name, script, cwd, msg, extra}) {
    const db = getDB(name)
    let date = new Date();
    const id = date.getTime();
    db[id] = {name, date: date.toLocaleString(), exec: {}, status: 'running', msg, extra,};
    const startDate = new Date().getTime();
    let status = 'success';
    for (let i = 0; i < script.length; i++) {
      const command = script[i];
      const cmd_id = new Date().getTime();
      db[id].exec[cmd_id] = {cmd: command,status:'running'};
      const historyCommand = db[id].exec[cmd_id];
      const cmdStartDate = new Date().getTime();
      try {
        await new Promise((resolve, reject) => {
          exec(command, {cwd,}, function (err, stdout, stderr) {
            console.log('EXEC', err, stdout, stderr);
            historyCommand.err = err;
            historyCommand.stdout = stdout;
            historyCommand.stderr = stderr;
            const endDate = new Date().getTime();
            historyCommand.duration = endDate - cmdStartDate;

            if (err) {
              historyCommand.status = 'failed';
              //failed to run the command
              reject(err);
            } else {
              historyCommand.status = 'success';
              resolve();
            }
          });
        })
      } catch (e) {
        status = 'failed';
        break;
      } finally {
      }
    } //end of for
    db[id].duration = new Date().getTime() - startDate;
    db[id].status = status;
  },
  getHistoryList(name) {
    const db = getDB(name);
    return Object.keys(db).map(key => {
      const it = db[key];
      return {
        id: key,
        time: +key,
        date: it.date,
        duration: it.duration,
        status: it.status,
        msg: it.msg,
      }
    }).sort((a, b) => b.time - a.time)
  },
  getHistoryItem(name, id) {
    const db = getDB(name);
    return db[id];
  }
}
