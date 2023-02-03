const { app } = require("./app");
const port = 8080;
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

//name is the resource value for our secrets in secret manager
(async () => {
	if (process.env.DEV !== "YESSIR") {
		const name = "projects/1003391217227/secrets/ENV_VARIABLES/versions/13";
		//instantiated a client for secretManager and calling accessSecretVersion method supplying the secret resource name
		const client = new SecretManagerServiceClient();
		const [version] = await client.accessSecretVersion({
			name: name,
		});

		//turning the buffer value of the payload into a readable string
		const payload = version.payload.data.toString("utf-8");
		//parsing the payload string to get a JSON object
		const parsedPayload = JSON.parse(payload);

		//assigning the associated key value pairs from the payload to env variables
		//these are now accessible anywhere in the project
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
	}
	//finally we start the server
	if (process.env.DEV === "YESSIR") {
		app.listen(process.env.PORT || port, () =>
			console.log(`Listening ${process.env.PORT || port}`)
		);
	}
})();
