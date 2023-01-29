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
    // const {data: {login}} = await octokit.rest.users.getAuthenticated();
    // console.log("hello, %s", login);
    const gitHubUserAPIResponse = await octokit.request('GET /user', {})
    console.log(gitHubUserAPIResponse, "response ")
    const gitHubUserRepos = await octokit.request('GET /user/repos{?affiliation=organization_member,per_page=100}}', {})
    console.log("user repos", gitHubUserRepos)
}


module.exports = gitHubUserInfoAPI