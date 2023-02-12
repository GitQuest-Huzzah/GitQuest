const Achievement = require("./models/Achievement");
const Channel = require("./models/Channel");
const db = require("./db");
const Goldlog = require("./models/Goldlog");
const Playerstat = require("./models/Playerstat");
const Quest = require("./models/Quest");
const Repo = require("./models/Repo");
const seed = require("./seed");
const User = require("./models/User");
const Workspace = require("./models/Workspace");

//model associations

User.belongsTo(Workspace);
Workspace.hasMany(User);

Repo.belongsTo(Workspace);
Workspace.hasMany(Repo);

Playerstat.belongsTo(User);
User.belongsTo(Playerstat);

User.hasMany(Goldlog);
Goldlog.belongsTo(User);

Workspace.hasMany(Quest);
Quest.belongsTo(Workspace);

User.hasMany(Quest);
Quest.belongsTo(User);

Workspace.hasMany(Channel);
Channel.belongsTo(Workspace);

User.belongsToMany(Achievement, { through: "user_achievement" });
Achievement.belongsToMany(User, { through: "user_achievement" });

seed()
module.exports = {
	Achievement,
	db,
	Goldlog,
	Repo,
	User,
	Workspace,
	Quest,
	Playerstat,
};


