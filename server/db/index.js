const db = require("./db");
const Repos = require("./models/Repos");
const Users = require("./models/Users");
const Workspaces = require("./models/Workspaces");
const GoldLog = require('./models/GoldLog')

//model associations

Users.belongsTo(Workspaces);
Workspaces.hasMany(Users);

Repos.belongsTo(Workspaces);
Workspaces.hasMany(Repos);

Users.hasMany(GoldLog)
GoldLog.belongsTo(Users)

module.exports = {
  db,
  Repos,
  Users,
  Workspaces,
};
