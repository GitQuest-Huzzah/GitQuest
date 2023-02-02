const { Octokit } = require("@octokit/core");
const retrieveGitHubAPIToken = require("./retrieveGitHubAPIToken");

const findOrgOnGH = async (reqBody) => {
    const orgName = reqBody.view.state.values.OwnerName.Owner_Input.value;
    const token = await retrieveGitHubAPIToken(reqBody)
    const octokit = new Octokit({
        auth: token,
    });
    try {
        const organization = await octokit.request("GET /orgs/{owner}", {
            owner: orgName,
        });
        return organization;
    } catch (error) {
        console.error(error);
    }
};

module.exports = findOrgOnGH;