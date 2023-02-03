const retrieveSecrets = require("../retrieveSecret");
const { app } = require("./app");

//name is the resource value for our secrets in secret manager
(() => {
	if (process.env.NODE_ENV === "production") {
		return retrieveSecrets();
	}
	app.listen(process.env.PORT, () =>
		console.log(`Listening ${process.env.PORT}`)
	);
})();
