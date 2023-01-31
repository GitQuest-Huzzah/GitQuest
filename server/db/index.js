const db = require('./db')
const Workspaces = require('./models/Workspaces');
const Users = require('./models/Users')
const Achievements = require('./models/Achievements')
const Users_Achievements = require('./models/Users_Achievements')
const Repos = require ('./models/Repos')

//model associations
Users.belongsToMany(Achievements, {through: Users_Achievements})
Achievements.belongsToMany(Users, {through: Users_Achievements})

Users.belongsTo(Workspaces)
Workspaces.hasMany(Users)

Repos.belongsTo(Workspaces)
Workspaces.hasMany(Repos)
//finding bot token that belongs to a workspace to send response to proper instance of bot
const findTokenByTeamId = async (teamId)=>{
    try{
        
        return await Workspaces.findOne({
            where:{
                teamID: teamId
            }
        })
    } catch(error){
        console.error(error)
    }
}

module.exports = {
    db, 
    Users,
    Workspaces, 
    Achievements,
    Users_Achievements,
    Repos,
    findTokenByTeamId
};
