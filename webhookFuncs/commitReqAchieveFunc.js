// identify the most recent achievement for commits
  const commitReqAchieveFunc = (obj, keys, numOfCommits) => {
    let achievement;
    for(const key of keys){
      if(key <= numOfCommits){
        achievement = { [key]: obj[key] }
      }
    }
    return achievement;
  }

  module.exports = commitReqAchieveFunc;