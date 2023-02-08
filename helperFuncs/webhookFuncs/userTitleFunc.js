 // update user's title based on current level number
 const userTitleFunc = (obj, keys, userLevel) => {
  let title;
  for (const key of keys){
    if(key <= userLevel){
      title = obj[key];
    }
  }
  return title;
}

module.exports = userTitleFunc;