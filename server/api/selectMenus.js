const { findAllWorkSpaceRepos } = require("../slackFuncs/commands");

const router = require("express").Router();

//path is api/selectMenus
router.post("/", (req, res, next) => {
    // res.sendStatus(200);
    const parsedSubmission = JSON.parse(req.body.payload);
    // console.log(parsedSubmission)
    (async () => {
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
            if (
                !repo.includes(parsedSubmission.value) &&
                parsedSubmission.value.length && index == repoNames.length-1
            ) {
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
                return res.send({ options: optionsArray }).status(200);
            }
        }
    })();
});

module.exports = router;
