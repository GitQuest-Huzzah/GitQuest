const { Users } = require("../db");

const retrieveGitHubAPIToken = async (reqBody) =>{
    const {dataValues:{gitHubToken}} = await Users.findOne({
        where:{
            slackID:reqBody.user.id
        }, 
        attributes: ["gitHubToken"]
    })
    return gitHubToken
}

module.exports = retrieveGitHubAPIToken;