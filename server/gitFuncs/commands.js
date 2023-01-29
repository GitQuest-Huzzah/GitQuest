const { Octokit } = require('@octokit/core');
const { Users } = require('../db');

const gitHubUserInfoAPI = async (reqBody) => {
    console.log(reqBody, "req body of api call")
    const user = await Users.findOne({
        where:{
            slackID: reqBody.user_id
        }
    })
    console.log(user, "user in api call")
    const octokit = new Octokit({
        auth: user.gitHubToken
    })
    console.log(octokit, "octokit")
    
    const {data: {login}} = await octokit.request.users.getAuthenticated();
    console.log("hello, %s", login);
}

module.exports = gitHubUserInfoAPI