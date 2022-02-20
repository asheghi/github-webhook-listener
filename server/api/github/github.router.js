const express = require('express');
const app = express.Router();
const bodyParser = require("body-parser");
const {GithubService} = require("./github.service");
const {ExecService} = require("./exec.service");

app.use(bodyParser.json())

function onPush(repo) {
  const {working_dir: cwd, script,name} = repo;
  ExecService.execute(name,script,cwd);
}


app.post('/repository/save',(req,res) => {
  const {name,script,working_dir} = req.body;
  GithubService.addRepository({name, script, working_dir});
  res.send('ok')
});

app.get('/repository/all',(req,res) => {
  const repositories = GithubService.getAllRepos()
  res.json(repositories);
})

app.delete('/repository/delete',(req,res) => {
  const {name} = req.body;
  GithubService.deleteRepository(name)
  res.send('ok');
})

app.post('/webhook', (req, res) => {
  const {body} = req;
  const repoName = body.repository.name;
  const repo = GithubService.getRepositoryByName(repoName);
  if (repo) {
    res.status(200).send('ok');
    onPush(repo);
  }else{
    res.status(404).send('repository not found!')
  }
})

app.get('/history/:name', (req, res) => {
  const {name} = req.params;
  res.json(ExecService.getHistoryList(name))
})

app.get('/history/:name/:id', (req, res) => {
  const {name,id} = req.params;
  res.json(ExecService.getHistoryItem(name,id))
})

app.get('/:name', (req, res) => {
  const {name} = req.params;
  const repo = GithubService.getRepositoryByName(name);
  onPush(repo);
  res.json(repo)
})






module.exports.GithubRouter = app;
