const db = require('./db')
const Workspaces = require('./models/Workspaces');
const Users = require('./models/Users')
const Spaces_Users = require('./models/Spaces_Users')

//model associations
Users.belongsToMany(Workspaces, {through: Spaces_Users})
Workspaces.belongsToMany(Users, {through: Spaces_Users})

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
    Spaces_Users,
    findTokenByTeamId
};