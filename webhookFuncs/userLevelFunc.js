// update user's level based on EXP being updated
  const userLevelFunc = (obj, keys, userExp) => {
    let level;
    for (const key of keys){
      if(key <= userExp){
        level = obj[key];
      }
    }
    return level;
  }

  module.exports = userLevelFunc;