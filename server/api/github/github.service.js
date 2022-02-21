const Fson = require('fson-db');
const {join} = require("path");
const {ExecService} = require("./exec.service");
const dbPath = join(__dirname, '../../../data/repositories');
const db = Fson(dbPath);
// todo implement better lock mechanism
const lock = {};
module.exports.GithubService = {
  repositories: db,
  getRepositoryByName(repoName) {
    return db[repoName];
  },
  addRepository({name, script, working_dir}) {
    db[name] = {name, script, working_dir};
  },
  getAllRepos() {
    return Object.keys(db).map(key => db[key])
  },
  deleteRepository(name) {
    db[name] = null;
    delete db[name];
  },
  async onPush({name,msg, extra}) {
    const repo = this.getRepositoryByName(name);
    const {working_dir: cwd, script} = repo;
    while (lock[name]){
      console.log('waiting for existing exec to finish ...');
      await new Promise(r => setTimeout(r, 5000));
    }
    try {
      console.log('start exec');
      lock[name] = true;
      await ExecService.execute({msg, name, script, cwd, extra});
    } catch (e) {
      console.error(e);
    } finally {
      console.log('done with exec');
      lock[name] = false;
    }
  }
}
