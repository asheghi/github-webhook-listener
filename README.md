# Github Webhook Listener
---
a simple, light-weight web application that can be registered as a [GithubWebhook](https://developer.github.com/webhooks/)
and execute shell commands in response to events.

Main use-case is to trigger `build` on self-hosted, git based applications, in a secure way, without exposing server credentials or SSH keys.


### Setup
#### Step 1
installing and running application
```shell
git clone https://github.com/semycolon/github-webhook-listener.git
cd github-webhook-listener
npm install

// change authentication credentials inside .env file
cp .env.sample .env

// single time running
npm run server:prod

//install pm2 to keep the app running
npm i -g pm2
pm2 start npm --name proxy -- run start server:prod
pm2 save
```
if you don't want to use your public ip:port as webhook url, use a subdomain and [ReverseProxy](https://github.com/semycolon/node-reverse-proxy)

---

#### Step 2
configure webhook url in Github repository setting.
 - login to your github account
 - goto https://github.com/{github-account}/{repo-name}/settings/hooks
 - click **Add webhook**.
 - set **Payload URL** to where application is listening : `http(s)://(domain|ip:port)/api/github/webhook`.
 - set **Content type** to `application/json`.
 - disable **SSL verification** if app is not behind a reverse proxy with ssl support.
 - set **Events** to `Just the push event`.
 - click **Add webhook**

--- 

#### Step 3
configure the application via WebGUI
 - open application you deployed in step 1 in the browser
 - use you auth credentials from .env file
 - click **Add Repo** in top right
 - enter name of repository
 - enter the working directory of shell commands.
 - enter your desired shell commands in each input as a single command




