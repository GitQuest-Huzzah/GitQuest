const db = require("./db");
const Repos = require("./models/Repos");
const Users = require("./models/Users");
const Workspaces = require("./models/Workspaces");
const Goldlog = require('./models/Goldlog')

//model associations

Users.belongsTo(Workspaces);
Workspaces.hasMany(Users);

Repos.belongsTo(Workspaces);
Workspaces.hasMany(Repos);

Users.hasMany(Goldlog)
Goldlog.belongsTo(Users)

module.exports = {
  db,
  Goldlog,
  Repos,
  Users,
  Workspaces
};
