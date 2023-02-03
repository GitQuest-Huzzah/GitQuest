const createAdminGHLink = ({ teamId, userId }) => {
	const userInfo = JSON.stringify({
		userId: userId,
		teamId: teamId,
	});
	const githubClientId = "***REMOVED***";
	//we are turning the string into a buffer
	const bufferUTFObj = Buffer.from(userInfo, "utf8");
	//this transforms the buffer into a base64 string before sending it so the user in the link on the optional state parameter
	const base64String = bufferUTFObj.toString("base64");
	return `https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=repo,read:status,read:repo_hook,read:org,read:user,read:email,read:discussion&state=${base64String}`;
};

module.exports = createAdminGHLink;
