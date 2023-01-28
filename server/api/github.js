const axios = require("axios");
const router = require("express").Router();

const githubClientId = "***REMOVED***";
const githubClientSecret = "***REMOVED***";

//path is /api/github/auth/connect
router.get("/auth/connect", async (req, res, next) => {
    console.log('connect route hit')
	res.redirect(
		`https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=read:repo_hook,read:org,read:user,read:email,read:discussion`
	).status(200)
});

let token = null;
//path is /api/github/auth/redirect
router.get("/auth/redirect", (req, res, next) => {
    console.log('redirect route hit this is the query', req.query)
	const body = {
		client_id: githubClientId,
		client_secret: githubClientSecret,
		code: req.query.code,
	};
	const opts = { headers: { accept: "application/json" } };
	axios
		.post(`https://github.com/login/access_token`, body, opts)
		.then((res) => res.data["access_token"])
		.then((_token) => {
			console.log("My token", token);
			token = _token;
			res.json({ ok: 1 });
		})
		.catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
