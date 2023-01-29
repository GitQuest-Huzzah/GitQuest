const { app } = require("./app");
const port = 8080;
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
app.listen(process.env.PORT || port, () =>
	console.log(`Listening ${process.env.PORT || port}`)
);

if (process.env.PORT) console.log("PORT EXISTS");
if (process.env.DB_NAME) console.log("db name exists");
if (process.env.DB_USER) console.log("db user exists");
if (process.env.DB_PASSWORD) console.log("db password exists");
if (process.env.DB_CONNECTION) console.log("db connection exists");
if (process.env.SLACK_CLIENT_ID) console.log("slack ID exists");
if (process.env.SLACK_CLIENT_SECRET) console.log("slack secret exists");
if (process.env.GH_CLIENT_SECRET) console.log("gh secret exists");
if (process.env.GH_CLIENT_ID) console.log("gh ID exists");

const client = new SecretManagerServiceClient();
const getSecret = () => {
	const name = "projects/1003391217227/secrets/ENV_VARIABLES/versions/1";
	return client
		.accessSecretVersion({
			name: name,
		})
		.then((response) => response[0].payload.data.toString("utf-8"))
		.then(console.log);
};

getSecret();
