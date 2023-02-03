const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const { app } = require("./server/app");
function retrieveSecrets(){
	const client = new SecretManagerServiceClient();
	client
		.accessSecretVersion({
			name: "projects/1003391217227/secrets/ENV_VARIABLES/versions/14",
		})
		.then(([version]) => {
			//turning the buffer value of the payload into a readable string
			const payload = version.payload.data.toString("utf-8");
			//parsing the payload string to get a JSON object
			const parsedPayload = JSON.parse(payload);
			//assigning the associated key value pairs from the payload to env variables
			//these are now accessible anywhere in the project
			process.env['DB_CONNECTION'] = parsedPayload.DB_CONNECTION;
			process.env['DB_NAME'] = parsedPayload.DB_NAME;
			process.env['DB_PASSWORD'] = parsedPayload.DB_PASSWORD;
			process.env['DB_USER'] = parsedPayload.DB_USER;
			process.env['GITHUB_CLIENT_ID'] = parsedPayload.GITHUB_CLIENT_ID;
			process.env['GITHUB_CLIENT_SECRET'] = parsedPayload.GITHUB_CLIENT_SECRET;
			process.env['SLACK_CLIENT_ID'] = parsedPayload.SLACK_CLIENT_ID;
			process.env['SLACK_CLIENT_SECRET'] = parsedPayload.SLACK_CLIENT_SECRET;
		}).then(app.listen(process.env.PORT, () =>
        console.log(`Listening ${process.env.PORT}`)
    )).catch(console.error)
};
module.exports = retrieveSecrets;