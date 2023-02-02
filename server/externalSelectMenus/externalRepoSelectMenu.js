const { findAllWorkSpaceRepos } = require("../slackFuncs");

const externalRepoSelectMenu = async (parsedSubmission) => {
    const {
        dataValues: { repos },
    } = await findAllWorkSpaceRepos(parsedSubmission.user.team_id);
    const repoNames = repos.map((repo) => repo.dataValues.repoName);
    for (const [index, repo] of repoNames.entries()) {
        if (
            repo.includes(parsedSubmission.value) &&
            parsedSubmission.value.length
        ) {
            const options = {
                options: [
                    {
                        text: {
                            type: "plain_text",
                            text: `${repo}`,
                        },
                        value: `${repo}`,
                    },
                ],
            };
            res.send(options).status(200);
            break;
        }
        if (index == repoNames.length - 1) {
            const optionsArray = repoNames.reduce((acc, repo) => {
                let currentrepo = {
                    text: {
                        type: "plain_text",
                        text: `${repo}`,
                    },
                    value: `${repo}`,
                };
                acc.push(currentrepo);
                return acc;
            }, []);
            return { options: optionsArray }
        }
    }
}

module.exports = externalRepoSelectMenu