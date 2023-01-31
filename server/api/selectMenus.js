const { findAllWorkSpaceRepos } = require("../slackFuncs/commands");

const router = require("express").Router();

//path is api/selectMenus
router.post("/", (req, res, next) => {
	res.sendStatus(200);
	const parsedSubmission = JSON.parse(req.body.payload);
	(async () => {
		const {
			dataValues: { repos },
		} = await findAllWorkSpaceRepos(parsedSubmission.user.team_id);
		console.log(repos, "console log");
		return {
			options: repos.map((repo) => {
							text: {
								type: "plain_text",
								text: "*this is plain_text text*",
							},
							value: "value-0",
						
				}
            )
		};
	})();
});

module.exports = router;
