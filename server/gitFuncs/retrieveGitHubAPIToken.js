const { Users } = require("../db");

const retrieveGitHubAPIToken = (reqBody) =>{
    const {dataValues:{gitHubToken}} = Users.findOne({
        where:{
            slackID:reqBody.user.id
        }, 
        attributes: ["gitHubToken"]
    })
    return gitHubToken
}

module.exports = retrieveGitHubAPIToken;