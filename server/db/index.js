const Bots = require('./models/Bots');

const findTokenByTeamId = async (teamId)=>{
    try{
        
        return await Bots.findOne({
            where:{
                teamID: teamId
            }
        })
    } catch(error){
        console.error(error)
    }
}

module.exports = findTokenByTeamId;