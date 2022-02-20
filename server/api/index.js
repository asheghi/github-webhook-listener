const express = require('express');
const {GithubRouter} = require("./github/github.router");
const app = express.Router();

app.use('/github', GithubRouter);

module.exports.ApiRouter = app;
