const { Users } = require("../db");

const retrieveGitHubAPIToken = (reqBody) =>{
    return Users.findOne({
        where:{
            slackID:reqBody.user.id
        }, 
        attributes: ["gitHubToken"]
    })
}

module.exports = retrieveGitHubAPIToken;