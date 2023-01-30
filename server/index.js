const { app } = require("./app");
const port = 8080;
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

// Instantiates a client

(async () => {
	const name = "projects/1003391217227/secrets/ENV_VARIABLES/versions/13";
	const client = new SecretManagerServiceClient();
	const [version] = await client.accessSecretVersion({
		name: name,
	});
	const payload = version.payload.data.toString("utf-8");
    
	const parsedPayload = JSON.parse(payload);

	process.env.DB_CONNECTION = parsedPayload.DB_CONNECTION;
	process.env.DB_NAME = parsedPayload.DB_NAME;
	process.env.DB_PASSWORD = parsedPayload.DB_PASSWORD;
	process.env.DB_USER = parsedPayload.DB_USER;
	process.env.GITHUB_CLIENT_ID = parsedPayload.GITHUB_CLIENT_ID;
	process.env.GITHUB_CLIENT_SECRET = parsedPayload.GITHUB_CLIENT_SECRET;
	process.env.SLACK_CLIENT_ID = parsedPayload.SLACK_CLIENT_ID;
	process.env.SLACK_CLIENT_SECRET = parsedPayload.SLACK_CLIENT_SECRET;

	app.listen(process.env.PORT || port, () =>
		console.log(`Listening ${process.env.PORT || port}`)
	);
})();
