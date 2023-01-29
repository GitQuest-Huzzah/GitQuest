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
    // const gitHubUserAPIResponse = await octokit.request('GET /user', {})
    const gitHubCommits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: 'GitQuest-Huzzah',
        repo: 'GitQuest'
      })
    console.log("big ol new repos", gitHubCommits, "big ol new repos")
}


module.exports = gitHubUserInfoAPI