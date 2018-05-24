var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/cloudnotes"
var db = pgp(connectionString)

module.exports = db;
