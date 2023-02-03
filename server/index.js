const retrieveRemoteSecrets = require("./retrieveSecrets");
require("dotenv").config();

maybeLoadRemoteSecrets().then(() =>
  require("./app").listen(process.env.PORT, () =>
    console.log(`Listening ${process.env.PORT}`),
	console.log(process.env)
  )
);
function maybeLoadRemoteSecrets() {
  if (process.env.ENVIRONMENT === "development") return Promise.resolve();

  return retrieveRemoteSecrets();
};
