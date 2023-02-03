const { Octokit } = require("@octokit/core");
const retrieveGitHubAPIToken = require("./retrieveGitHubAPIToken");

const findOrgOnGH = async (reqBody) => {
    const token = await retrieveGitHubAPIToken(reqBody)
    const octokit = new Octokit({
        auth: token
    });
    try {
        const organization = await octokit.request("GET /orgs/{owner}", {
            owner: reqBody.view.state.values.OwnerName.Owner_Input.value,
        });
        return organization;
    } catch (error) {
        console.error(error);
    }
};

module.exports = findOrgOnGH;