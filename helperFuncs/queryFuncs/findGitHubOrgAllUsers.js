const { Octokit } = require("@octokit/core");
const { Workspace, Repo } = require("../../server/db");
const findGitHubAPIToken = require("./findGitHubAPIToken");
//find a user's slackID to supply the GH API with access Token
//the reqBody is the req.body from a slack command received at it's associated endpoint
const findGitHubOrgAllUsers = async (reqBody) => {
    const workspace = await Workspace.findOne({
        where: {
            teamID: reqBody.user.team_id,
        },
        include: {
            model: Repo,
        },
    });
    const token = await findGitHubAPIToken(reqBody);
    //creating a new instance of the GH API to poll the API which takes GH token as Auth headers
    const octokit = new Octokit({
        auth: token,
    });
    //request to get all commits from a specific repo
    if (workspace.dataValues.ghType === "organization") {
        const allOrgMembers = await octokit.request(
            "GET /orgs/{owner}/members",
            {
                owner: workspace.dataValues.orgName,
            }
        );
        return allOrgMembers;
    }
    if (workspace.dataValues.ghType === "individual") {
        return workspace.dataValues.repos.reduce(async (acc, repo) => {
            const currentRepo = await octokit.request(
                "GET /repos/{owner}/{repo}/collaborators",
                {
                    owner: workspace.dataValues.orgName,
                    repo: repo.dataValues.repoName,
                }
            );
            acc = [...acc, ...currentRepo.data];
            return acc;
        }, []);
    }
};

module.exports = findGitHubOrgAllUsers;
