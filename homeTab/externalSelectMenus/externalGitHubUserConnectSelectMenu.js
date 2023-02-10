const { findGitHubOrgAllUser } = require("../../helperFuncs");

const externalGitHubUserConnectSelectMenu = async (reqBody) => {
	const allMembers = await findGitHubOrgAllUser(reqBody);
	const memberGHAccounts = allMembers.data.map((member) => member);

	const optionsArray = memberGHAccounts.reduce((acc, member) => {
		let currentLogin = {
			text: {
				type: "plain_text",
				text: `${member.login}`,
			},
			value: `${member.id}`,
		};
		acc.push(currentLogin);
		return acc;
	}, []);
	return { options: optionsArray };
};

module.exports = externalGitHubUserConnectSelectMenu;
