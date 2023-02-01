const { findAllWorkSpaceRepos } = require("../slackFuncs/commands");

const router = require("express").Router();

//path is api/selectMenus
router.post("/", (req, res, next) => {
	// res.sendStatus(200);
	const parsedSubmission = JSON.parse(req.body.payload);
	(async () => {
		const {
			dataValues: { repos },
		} = await findAllWorkSpaceRepos(parsedSubmission.user.team_id);
		const repoNames = repos.map((repo) => repo.dataValues.repoName);
        console.log(repoNames)
	})();
	const options = {
          "options": [
            {
              "text": {
                  "type": "plain_text",
                  "text": "*this is plain_text text*"
              },
              "value": "value-0"
            },
            {
              "text": {
                  "type": "plain_text",
                  "text": "*this is plain_text text*"
              },
              "value": "value-1"
            },
            {
              "text": {
                  "type": "plain_text",
                  "text": "*this is plain_text text*"
              },
              "value": "value-2"
            }
          ]
        }
	res.send(options).status(200);
});

module.exports = router;
