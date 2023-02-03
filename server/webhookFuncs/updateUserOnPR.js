const expLevel = require('./expLevel');
const commitAchievements = require('./commitAchievements');
const pullRequestAchievements = require('./pullRequestAchievements');
const titles = require('./titles');
const { Users, Workspaces } = require('../db');
const userLevelFunc = require('./userLevelFunc');
const userTitleFunc = require('./userTitleFunc');
const pullReqAchieveFunc = require('./pullReqAchieveFunc');
const commitReqAchieveFunc = require('./commitReqAchieveFunc');


const updateUserOnPR = async (reqBody) => {
	const userGithubId = reqBody.sender.id.toString();
	const userOrgName = reqBody.organization.login;

	const user = await Users.findOne({
		where: {
			gitHubID: userGithubId,
		},
		include: {
			model: Workspaces,
			where: {
				orgName: userOrgName,
			},
		},
	});

	const numOfCommits = reqBody.pull_request.commits + user.dataValues.commits;
	const userExp = numOfCommits * 10;
	const numOfPulls = user.dataValues.pullRequests + 1;

	const currLevel = user.dataValues.level;
	let userGold = user.dataValues.gold;
	let rewardGold = user.dataValues.rewardGold;
	const userAchievements = user.dataValues.achievements;

	const achievementsPR = pullRequestAchievements();
	const achievementsCommit = commitAchievements();
	const levels = expLevel();
	const title = titles();

  // update gold and reward gold based on leveling up
  const userLevel = userLevelFunc(levels, Object.keys(levels), userExp);
  if(userLevel > currLevel){
    let levelDiff = userLevel - currLevel;
    userGold = userGold + (250 * levelDiff);
    rewardGold = rewardGold + (50 * levelDiff);
  }

  // update user's title based on current level number
  const userTitle = userTitleFunc(title, Object.keys(title), userLevel)
  // identify the most recent achievement based on pull requests
  const userPRAchieve = pullReqAchieveFunc(achievementsPR, Object.keys(achievementsPR), numOfPulls)
  // identify the most recent achievement for commits
  const userCommitAchieve = commitReqAchieveFunc(achievementsCommit, Object.keys(achievementsCommit), numOfCommits)
  
  // check to see if user achievements already exist
  // either add the initial achievement, or add new achievements to existing
  let parsedUserAchievements = JSON.parse(userAchievements);
 
  for(const achieve of parsedUserAchievements){
    if(JSON.stringify(achieve) !== JSON.stringify(userCommitAchieve)){
      parsedUserAchievements = [...parsedUserAchievements, userCommitAchieve]
      break;
    }
  }

	for (const achieve of parsedUserAchievements) {
		if (JSON.stringify(achieve) !== JSON.stringify(userPRAchieve)) {
			parsedUserAchievements = [...parsedUserAchievements, userPRAchieve];
			break;
		}
	}

	let userAchievementJSON = JSON.stringify(parsedUserAchievements);

	await user.update({
		commits: numOfCommits,
		pullRequests: numOfPulls,
		level: userLevel,
		title: userTitle,
		exp: userExp,
		achievements: userAchievementJSON,
		gold: userGold,
		rewardGold: rewardGold,
	});
};

module.exports = updateUserOnPR;
