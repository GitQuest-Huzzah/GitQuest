const { Users } = require("../db");

const retrieveGitHubAPIToken = (reqBody) =>{
    const user = Users.findOne({
        where:{
            slackID:reqBody.user.id
        }, 
        attributes: ["gitHubToken"]
    })
    console.log(user, "retrieved user")
    return user.dataValues.gitHubToken
}

module.exports = retrieveGitHubAPIToken;