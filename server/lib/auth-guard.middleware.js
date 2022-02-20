const basicAuth = require('express-basic-auth')
const user = process.env.AUTH_USER;
const password = process.env.AUTH_PASSWORD;

let middleware;
if (user && password) {
  middleware = basicAuth({
    challenge: true,
    users: {
      [user]: password,
    }
  });
}

module.exports.AuthGuard = async function (req, res, next) {
  if (!middleware) {
    return res.status(401).send('un-authorized')
  }
  return middleware(req,res,next);
}
