const { Octokit } = require('@octokit/core');
const { Users } = require('../db');

const gitHubUserInfoAPI = async (reqBody) => {
    const user = await Users.findOne({
        where:{
            slackID: reqBody.user_id
        }
    })
    const octokit = new Octokit({
        auth: user.dataValues.gitHubToken
    })
    console.log(user.dataValues.gitHubToken, "gh token")
    console.log(octokit.request,"octokit rest")
    console.log(octokit.rest.users,"rest users octokit")
    const {data: {login}} = await octokit.rest.users.getAuthenticated();
    console.log("hello, %s", login);
}

module.exports = gitHubUserInfoAPI