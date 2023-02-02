const { Workspaces } = require("../db")

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

module.exports = findTokenByTeamId;