const Achievement = require("./models/Achievement");

const seed = async () =>{
	try {
		const achievements = await Achievement.findAll();
		achievements.length
		? null
		: (() => {
			Achievement.bulkCreate([
				{
					commitValue: 1,
					achievementType: "commit",
					description: "You've made your first commit!",
				},
				{
					commitValue: 50,
					achievementType: "commit",
					description: "Halfway to 100 commits. You are an aspiring adventurer.",
				},
				{
					commitValue: 100,
					achievementType: "commit",
					description: "100 Commits! Unbelievable...fortunes are coming your way, with extra to share.",
				},
				{
					commitValue: 250,
					achievementType: "commit",
					description: "You are becoming the conqueror of commits. 250 completed!",
				},
				{
					commitValue: 500,
					achievementType: "commit",
					description: "500 commits? 500! Your quest is well underway. Enjoy the spoils of your work.",
				},
				{
					commitValue: 750,
					achievementType: "commit",
					description: "750 commits made. Your powers are growing (and so is your gold).",
				},
				{
					commitValue: 1000,
					achievementType: "commit",
					description: "The pinnacle of commits. ONE THOUSAND! A legend before our eyes!",
				},
				{
					pullRequestValue: 1,
					achievementType: "pullRequest",
					description: "Congratulations, young neophyte. You've made your first pull request!",
				},
				{
					pullRequestValue: 5,
					achievementType: "pullRequest",
					description: "5 pull requests in the bag!",
				},
				{
					pullRequestValue: 10,
					achievementType: "pullRequest",
					description: "You are rapidly gaining attention on your quest. 10 pull requests made!",
				},
				{
					pullRequestValue: 15,
					achievementType: "pullRequest",
					description: "Continue to blaze the trail! You've reached 15 pull requests.",
				},
				{
					pullRequestValue: 20,
					achievementType: "pullRequest",
					description: "With 20 pull requests, you have gained quite the experience...and even more gold.",
				},
				{
					pullRequestValue: 25,
					achievementType: "pullRequest",
					description: "25 pull requests! The journey has been a long one, but you are focused on the quest. Take a look at your treasures!",
				},
				{
					pullRequestValue: 30,
					achievementType: "pullRequest",
					description: "Your 30th pull request! At this point, you are becoming untouchable. Much fame and fortune for you!",
				},
				{
					questsCompleted: 1,
					achievementType: "quest",
					description: "Your first quest! Well done, young one.",
				},
				{
					questsCompleted: 5,
					achievementType: "quest",
					description: "5 quests completed!",
				},
				{
					questsCompleted: 10,
					achievementType: "quest",
					description: "At 10 quests, you are becoming quite experienced.",
				},
				{
					questsCompleted: 25,
					achievementType: "quest",
					description: "25 quests. You're no slouch!",
				},
				{
					questsCompleted: 50,
					achievementType: "quest",
					description: "You are one avid adventure seeker. 50 QUESTS!",
				},
				{
					questsCompleted: 75,
					achievementType: "quest",
					description: "Quest #75: You are one of the powerful beings of the realm.",
				},
				{
					questsCompleted: 100,
					achievementType: "quest",
					description: "100 quests is a remarkable achievement! What sorcery!",
				}
			]);
			console.log("Achievements Seeded Successfully")
		})();
	} catch(error){
		console.error(error)
	}
	}
	
module.exports = seed;