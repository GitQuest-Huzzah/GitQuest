const { Octokit } = require("@octokit/core");
const { Users, Workspaces } = require("../db");

const gitHubSetRepoHook = async (reqBody, repos) => {
    const user = await Users.findOne({
        where: {
            slackID: reqBody.user.id,
        },
        include: Workspaces,
    });

    const octokit = new Octokit({
        auth: "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",
        // needs to be user.gitToken
    });
    console.log(user.dataValues.workspace.dataValues.orgName);

    reqBody.view.state.values.adminRepoModal.adminRepoModalAction.selected_options.forEach(async (repo) => {
        await octokit.request("POST /repos/{owner}/{repo}/hooks", {
            owner: user.dataValues.workspace.dataValues.orgName,
            repo: repo.value,
            name: "web",
            active: true,
            events: ["push", "pull_request"],
            config: {
                url: "https://gitquest.fun/api/webhook",
                content_type: "json",
                insecure_ssl: "0",
            },
        });
    });
};

module.exports = gitHubSetRepoHook;

