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
                url: "https://ece1-2603-9000-9300-a36b-4937-cdfd-8e40-2bfe.ngrok.io/api/webhook",
                content_type: "json",
                insecure_ssl: "0",
            },
        });
    });
};

module.exports = gitHubSetRepoHook;

