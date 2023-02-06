const { findAllAvailableQuests } = require("../slackFuncs");

const externalQuestLogSelect = async (parsedSubmission) => {
  const quests = await findAllAvailableQuests(parsedSubmission);


    for (const [index, quest] of quests.entries()) {
    	if (
    		quest.dataValues.keyword.includes(parsedSubmission.value) &&
    		parsedSubmission.value.length
    	) {
    		const options = {
    			options: [
    				{
    					text: {
    						type: "plain_text",
    						text: `${quest.dataValues.keyword}`,
    					},
    					value: `${quest.dataValues.id}`,
    				},
    			],
    		};
    		return options;
    	}
    	if (index == quests.length - 1) {
    		const optionsArray = quests.reduce((acc, quest) => {
    			let currentrepo = {
    				text: {
    					type: "plain_text",
    					text: `${quest.dataValues.keyword}`,
    				},
    				value:`${quest.dataValues.id}`
    			};
    			acc.push(currentrepo);
    			return acc;
    		}, []);
    		return { options: optionsArray };
    	}
    }
};

module.exports = externalQuestLogSelect;
