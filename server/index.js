const {SecretManagerServiceClient} = require('@google-cloud/secret-manager').v1;
const {app} = require('./app');
const port = 8080;

app.listen(process.env.PORT || port, ()=> console.log(`Listening ${process.env.PORT || port}`));



function main() {
  const name = 'projects/1003391217227/secrets/ENV_VARIABLES/versions/1'
  // Imports the Secretmanager library

  // Instantiates a client
  const secretmanagerClient = new SecretManagerServiceClient();

  async function callGetSecret() {
    // Construct request
    const request = {
      name,
    };

    // Run request
    const response = await secretmanagerClient.accessSecretVersion(request);
    console.log(response);
  }
  callGetSecret();
}
main();