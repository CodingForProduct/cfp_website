var auth = require('http-auth');

var basic = auth.basic({
    realm: "Coding For Product Area.",
    file: __dirname + "/users.htpasswd"
});

module.exports = { auth, basic };
