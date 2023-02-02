const expLevel = require('./expLevel');
const commitAchievements = require('./commitAchievements');
const pullRequestAchievements = require('./pullRequestAchievements');
const titles = require('./titles');
const { Users, Workspaces } = require('../db');


const updateUserOnPR = async (reqBody) => {
  const userGithubId = reqBody.sender.id.toString();
  const userOrgName = reqBody.organization.login;
  
  const user = await Users.findOne({
    where: {
      gitHubID: userGithubId
    },
    include: {
      model: Workspaces,
      where: {
        orgName: userOrgName
      }
    }
  })
  // console.log('user info', user)
  const numOfCommits = reqBody.pull_request.commits + user.dataValues.commits;
  const userExp = numOfCommits * 10;
  const numOfPulls = user.dataValues.pullRequests + 1;

  const achievementsPR = pullRequestAchievements();
  const achievementsCommit = commitAchievements();
  const levels = expLevel();
  const title = titles();

  // const userLevel = levels[Object.keys(levels).reduce((acc, key, index, array)=>{
  //   if(key > userExp && !acc){
  //     return array[index-1]
  //   }
  // })];
// export this func
  const userLevelFunc = (obj, keys, userExp) => {
    let level;
    for (const key of keys){
      if(key <= userExp){
        level = obj[key];
      }
    }
    return level;
  }
  //end export

  const userLevel = userLevelFunc(levels, Object.keys(levels), userExp);

  // export this one too
  const userTitleFunc = (obj, keys, userLevel) => {
    let title;
    for (const key of keys){
      if(key <= userLevel){
        title = obj[key];
      }
    }
    return title;
  }
  // end export

  const userTitle = userTitleFunc(title, Object.keys(title), userLevel)
  
  // export this guy
  const pullReqAchieveFunc = (obj, keys, numOfPulls) => {
    let achievement;
    for(const key of keys){
      if(key <= numOfPulls){
        achievement = { [key]: obj[key] }
      }
    }
    return achievement;
  }
  //end export

  const userPRAchieve = pullReqAchieveFunc(achievementsPR, Object.keys(achievementsPR), numOfPulls)

//export dis shit
  const commitReqAchieveFunc = (obj, keys, numOfCommits) => {
    let achievement;
    for(const key of keys){
      if(key <= numOfCommits){
        achievement = { [key]: obj[key] }
      }
    }
    return achievement;
  }
  //end export

  const userCommitAchieve = commitReqAchieveFunc(achievementsCommit, Object.keys(achievementsCommit), numOfCommits)
  
  const userAchievementJSON = JSON.stringify([userCommitAchieve, userPRAchieve]);
  
  await user.update({
    commits: numOfCommits,
    pullRequests: numOfPulls,
    level: userLevel,
    title: userTitle,
    exp: userExp,
    achievements: userAchievementJSON
  })
}

module.exports = updateUserOnPR;