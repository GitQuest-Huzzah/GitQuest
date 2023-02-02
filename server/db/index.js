const Achievements = require('./models/Achievements')
const db = require('./db')
const Repos = require ('./models/Repos')
const Users = require('./models/Users')
const Users_Achievements = require('./models/Users_Achievements')
const Workspaces = require('./models/Workspaces');

//model associations
Users.belongsToMany(Achievements, {through: Users_Achievements})
Achievements.belongsToMany(Users, {through: Users_Achievements})

Users.belongsTo(Workspaces)
Workspaces.hasMany(Users)

Repos.belongsTo(Workspaces)
Workspaces.hasMany(Repos)


module.exports = {
    Achievements,
    db, 
    Repos,
    Users_Achievements,
    Users,
    Workspaces, 
};
