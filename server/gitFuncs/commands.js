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
    console.log(octokit.request,"octokit request")
    console.log(octokit.request.users,"request users octokit")
    const {data: {login}} = await octokit.request.users.getAuthenticated();
    console.log("hello, %s", login);
}

module.exports = gitHubUserInfoAPI