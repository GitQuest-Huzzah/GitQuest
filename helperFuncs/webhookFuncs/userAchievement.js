const { Achievement } = require("../../server/db");
const updateAchievement = require("./updateAchievement");

const userAchievement = async (user, commits, pulls) => {
	const achievements = await Achievement.findAll();

	const commitAchieve = updateAchievement(commits, "commitValue", achievements);
	const pullAchieve = updateAchievement(
		pulls,
		"pullRequestValue",
		achievements
	);

	const result = [pullAchieve, commitAchieve];
	user.addAchievements(
		result.filter((achievement) => (achievement ? true : false))
	);
};

module.exports = userAchievement;
