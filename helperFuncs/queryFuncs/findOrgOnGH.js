const { Octokit } = require("@octokit/core");
const findGitHubAPIToken = require("./findGitHubAPIToken");
const findOrgOnGH = async (reqBody) => {
	const ownerName = reqBody.view.state.values.OwnerName.Owner_Input.value;
	const ownerOrgSelect =
		reqBody.view.state.values.ownerOrOrg.ownerOrgSelect.selected_option.value;
	const token = await findGitHubAPIToken(reqBody);
	const octokit = new Octokit({
		auth: token,
	});
	try {
		const organization =
			ownerOrgSelect === "organziation"
				? await octokit.request("GET /orgs/{owner}", {
						owner: ownerName,
				  })
				: await octokit.request("GET /users/{username}", {
						username: ownerName,
				  });
		return organization;
	} catch (error) {
		console.error(error);
	}
};

module.exports = findOrgOnGH;
