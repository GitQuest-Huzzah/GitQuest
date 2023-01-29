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
    const gitHubCommits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: 'GitQuest-Huzzah',
        repo: 'GitQuest'
      })
}


module.exports = gitHubUserInfoAPI