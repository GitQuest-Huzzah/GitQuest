const updateAchievement = (type, value, achievements) => {
    let result;
    for (const achievement of achievements) {
        if (
            type >= achievement.dataValues[value] &&
            achievement.dataValues[value]
        ) {
            result = achievement.dataValues.id;
        }
    }
    return result;
};
module.exports = updateAchievement;
