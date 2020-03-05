let config = require('dotenv').config();
config.Promise = global.Promise;
module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/profile",
    JWT: process.env.JWTSECRET,
    GITHUBCLIENT: process.env.GIT,
    GITHUBSECRET: process.env.GITSECRET
}