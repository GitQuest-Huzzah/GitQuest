const { findAllReposInDB } = require("../../apiFuncs/gitFuncs");
const externalRepoDeleteSelectMenu = async (parsedSubmission) => {
	const {
		dataValues: {
			workspace
		},
	} = await findAllReposInDB(parsedSubmission);
	const {repos}= workspace;
	for (const [index, repo] of repos.entries()) {
		if (
			repo.dataValues.repoName.includes(parsedSubmission.value) &&
			parsedSubmission.value.length
		) {
			const options = {
				options: [
					{
						text: {
							type: "plain_text",
							text: `${repo.dataValues.repoName}`,
						},
						value: `${repo.dataValues.repoId}`,
					},
				],
			};
			return options;
		}
		if (index == repos.length - 1) {
			const optionsArray = repos.reduce((acc, repo) => {
				let currentrepo = {
					text: {
						type: "plain_text",
						text: `${repo.dataValues.repoName}`,
					},
					value:`${[repo.dataValues.repoId,workspace.dataValues.orgName]}`
				};
				acc.push(currentrepo);
				return acc;
			}, []);
			return { options: optionsArray };
		}
	}
};

module.exports = externalRepoDeleteSelectMenu;
