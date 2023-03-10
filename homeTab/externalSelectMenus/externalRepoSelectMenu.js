const { findAllOrgRepos } = require("../../helperFuncs");
const externalRepoSelectMenu = async (parsedSubmission) => {
	const { data } = await findAllOrgRepos(parsedSubmission);
	for (const [index, repo] of data.entries()) {
		if (
			repo.name.includes(parsedSubmission.value) &&
			parsedSubmission.value.length
		) {
			const options = {
				options: [
					{
						text: {
							type: "plain_text",
							text: `${repo.name}`,
						},
						value: `${repo.id}`,
					},
				],
			};
			return options;
		}
		if (index == data.length - 1) {
			const optionsArray = data.reduce((acc, repo) => {
				let currentrepo = {
					text: {
						type: "plain_text",
						text: `${repo.name}`,
					},
					value: `${repo.id}`,
				};
				acc.push(currentrepo);
				return acc;
			}, []);
			return { options: optionsArray };
		}
	}
};

module.exports = externalRepoSelectMenu;
