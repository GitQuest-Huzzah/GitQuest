const Sequelize = require("sequelize");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

//this is the connection to a localinstance of the DB
let db = "";
(async () => {
	console.log(process.env);

	if (process.env.NODE_ENV !== "production") {
		exports = db = new Sequelize("postgres://localhost:5432/gitgoingdb", {
			logging: false,
		});
	}
	//this is the connection to the deployed DB
	if (process.env.NODE_ENV === "production") {
		console.log("deploy route");
		const name = "projects/1003391217227/secrets/ENV_VARIABLES/versions/13";
		//instantiated a client for secretManager and calling accessSecretVersion method supplying the secret resource name
		const client = new SecretManagerServiceClient();
		const [version] = await client.accessSecretVersion({
			name: name,
		});
		console.log(version, "deploy version");
		//turning the buffer value of the payload into a readable string
		const payload = version.payload.data.toString("utf-8");
		//parsing the payload string to get a JSON object
		console.log(payload, "deploy payload pre parse");
		const parsedPayload = JSON.parse(payload);
		console.log(parsedPayload, "deploy payload");
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
		exports = db = new Sequelize(
			process.env.DB_NAME,
			process.env.DB_USER,
			process.env.DB_PASSWORD,
			{
				dialect: "postgres",
				host: process.env.DB_CONNECTION,
				logging: false,
				dialectOptions: {
					socketPath: process.env.DB_CONNECTION,
				},
			}
		);
	}

	db.sync();
})();
