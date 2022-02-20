const Fson = require('fson-db');
const {join} = require("path");
const dbPath = join(__dirname, '../../../data/repositories');
const db = Fson(dbPath);
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
  }
}
