const express = require('express');
const app = express.Router();
const bodyParser = require("body-parser");
const {GithubService} = require("./github.service");
const {ExecService} = require("./exec.service");
const {AuthGuard} = require("../../lib/auth-guard.middleware");

app.use(bodyParser.json())

// public route
app.post('/webhook', (req, res) => {
  const {body} = req;
  const repoName = body.repository.name;
  const repo = GithubService.getRepositoryByName(repoName);
  if (repo) {
    res.status(200).send('ok');
    GithubService.onPush(repo);
  }else{
    res.status(404).send('repository not found!')
  }
})

app.use(AuthGuard)

app.post('/repository/save',(req,res) => {
  const {name,script,working_dir} = req.body;
  GithubService.addRepository({name, script, working_dir});
  res.send('ok')
});

app.get('/repository/all',(req,res) => {
  const repositories = GithubService.getAllRepos()
  res.json(repositories);
})

app.delete('/repository/:name',(req,res) => {
  const {name} = req.params;
  if (!name ) return res.status(422).send('no name');
  GithubService.deleteRepository(name)
  res.send('ok');
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
  GithubService.onPush(name);
  res.json(repo)
})






module.exports.GithubRouter = app;
