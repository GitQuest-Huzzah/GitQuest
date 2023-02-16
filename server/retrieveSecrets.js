const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

function retrieveSecrets() {
	const client = new SecretManagerServiceClient();

	return client
		.accessSecretVersion({
			name: "projects/1003391217227/secrets/ENV_VARIABLES/versions/18",
		})
		.then(([version]) => {
			//turning the buffer value of the payload into a readable string
			const payload = version.payload.data.toString("utf-8");
			//parsing the payload string to get a JSON object
			const parsedPayload = JSON.parse(payload);
			//assigning the associated key value pairs from the payload to env variables
			//these are now accessible anywhere in the project
			process.env["ENVIRONMENT"] = parsedPayload.ENVIRONMENT;
			process.env["DB_CONNECTION"] = parsedPayload.DB_CONNECTION;
			process.env["DB_NAME"] = parsedPayload.DB_NAME;
			process.env["DB_PASSWORD"] = parsedPayload.DB_PASSWORD;
			process.env["DB_USER"] = parsedPayload.DB_USER;
			process.env["GITHUB_CLIENT_ID"] = parsedPayload.GITHUB_CLIENT_ID;
			process.env["GITHUB_CLIENT_SECRET"] = parsedPayload.GITHUB_CLIENT_SECRET;
			process.env["SLACK_CLIENT_ID"] = parsedPayload.SLACK_CLIENT_ID;
			process.env["SLACK_CLIENT_SECRET"] = parsedPayload.SLACK_CLIENT_SECRET;
			process.env["PRERENDER_URL"] = parsedPayload.PRERENDER_URL;
			process.env["FRONTEND_PRERENDER"] = parsedPayload.FRONTEND_PRERENDER;
			process.env["WEBHOOK_URL"] = parsedPayload.WEBHOOK_URL;
		})
		.catch(console.error);
}
module.exports = retrieveSecrets;
