const { Octokit } = require("@octokit/core");

const findOrgOnGH = async (orgName) => {
    
    const octokit = new Octokit({
        auth: "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",
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