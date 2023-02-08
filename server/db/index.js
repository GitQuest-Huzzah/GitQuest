const db = require("./db");
const Channel = require('./models/Channel')
const Goldlog = require("./models/Goldlog");
const Quest = require("./models/Quest");
const Repos = require("./models/Repos");
const Users = require("./models/Users");
const Workspaces = require("./models/Workspaces");

//model associations

Users.belongsTo(Workspaces);
Workspaces.hasMany(Users);

Repos.belongsTo(Workspaces);
Workspaces.hasMany(Repos);

Users.hasMany(Goldlog);
Goldlog.belongsTo(Users);

Workspaces.hasMany(Quest)
Quest.belongsTo(Workspaces)

Users.hasMany(Quest)
Quest.belongsTo(Users)

Workspaces.hasMany(Channel)
Channel.belongsTo(Workspaces)

module.exports = {
    db,
    Goldlog,
    Repos,
    Users,
    Workspaces,
    Quest,
};
