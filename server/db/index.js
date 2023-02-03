const db = require("./db");
const Repos = require("./models/Repos");
const Users = require("./models/Users");
const Workspaces = require("./models/Workspaces");

//model associations

Users.belongsTo(Workspaces);
Workspaces.hasMany(Users);

Repos.belongsTo(Workspaces);
Workspaces.hasMany(Repos);

module.exports = {
  db,
  Repos,
  Users,
  Workspaces,
};
