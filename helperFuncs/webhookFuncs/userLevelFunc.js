const { Goldlog, Playerstat } = require("../../server/db/index");

const expEnum = {
    0: 1,
    10: 2,
    50: 3,
    2500: 4,
    5000: 5,
    7500: 6,
    10000: 7,
    12500: 8,
    15000: 9,
    17500: 10,
    20000: 11,
    22500: 12,
    25000: 13,
    27500: 14,
    30000: 15,
    32500: 16,
    35000: 17,
    37500: 18,
    40000: 19,
    42500: 20,
};
const titlesEnum = {
    1: "Neophyte",
    2: "Fledgling",
    4: "Apprentice",
    10: "Trailblazer",
    13: "Specialist",
    16: "Warrior",
    17: "Champion",
    18: "Sorcerer",
    19: "Legend",
    20: "Realm Ruler",
};

const userLevelFunc = async (user, gainedExp, gainedGold) => {
    const {
        dataValues: { exp, level, gold, rewardGold },
    } = user;

    const totalExp = gainedExp + exp;

    const levelFromExp = (exp) => {
        for (let x = exp; x > 0; x--) {
            if (expEnum[x]) return expEnum[x];
        }
        throw new Error("you coded fucked up");
    };
    const currentLevel = levelFromExp(totalExp);

    const titleFromLevel = (lvl) => {
        for (let x = lvl; x > 0; x--) {
            if (titlesEnum[x]) return titlesEnum[x];
        }
        throw new Error("you coded fucked up");
    };

    currentTitle = titleFromLevel(currentLevel);

    let totalGold = gainedGold ? gainedGold + gold : gold;
    let totalRewardGold;

    if (currentLevel > level) {
        let levelDiff = currentLevel - level;
        totalGold = totalGold + 250 * levelDiff;
        totalRewardGold = rewardGold + 250 * levelDiff;
        const log = await Goldlog.create({
            description: `You've received ${
                levelDiff * 250
            } gold from leveling up!`,
            valueChange: `+${levelDiff * 250}`,
        });
        user.addGoldlog(log);
    }

    if (gainedGold) {
        const log = await Goldlog.create({
            description: `You've received ${gainedGold} gold from a Quest!`,
            valueChange: `+${gainedGold}`,
        });
        user.addGoldlog(log);
    }

    await Playerstat.update(
        {
            level: currentLevel,
            exp: totalExp,
            gold: totalGold,
            title: currentTitle,
            rewardGold: totalRewardGold,
        },
        {
            where: {
                userId: user.dataValues.id,
            },
        }
    );
};

module.exports = userLevelFunc;
