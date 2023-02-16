const { Achievement, User, Workspace, Playerstat } = require("../../server/db");
const userLevelFunc = require("./userLevelFunc");
const userAchievement = require("./userAchievement");

const updateUserOnPR = async (reqBody) => {
	console.log(reqBody);

	const userWorkspace = await Workspace.findOne({
		where: {
			orgName: reqBody.organization
				? reqBody.organization.login
				: reqBody.repository.owner.login,
		},
	});
	const user = await User.findOne({
		where: {
			gitHubID: reqBody.sender.id.toString(),
			workspaceId: userWorkspace.dataValues.id,
		},
		include: [
			{
				model: Workspace,
				where: {
					orgName: reqBody.organization
						? reqBody.organization.login
						: reqBody.repository.owner.login,
				},
			},
			{
				model: Playerstat,
			},
			{
				model: Achievement,
			},
		],
	});

	const numOfCommits =
		reqBody.pull_request.commits +
		user.dataValues.playerstat.dataValues.commits;
	const gainedExp = reqBody.pull_request.commits * 10;
	const numOfPulls = user.dataValues.playerstat.dataValues.pullRequests + 1;

	userLevelFunc(user, gainedExp);
	userAchievement(user, numOfCommits, numOfPulls);

	// identify the most recent achievement based on pull requests
	Playerstat.update(
		{
			commits: numOfCommits,
			pullRequests: numOfPulls,
		},
		{
			where: {
				userId: user.dataValues.id,
			},
		}
	);
};

module.exports = updateUserOnPR;
