const {SecretManagerServiceClient} = require('@google-cloud/secret-manager').v1;
const {app} = require('./app');
const port = 8080;

app.listen(process.env.PORT || port, ()=> console.log(`Listening ${process.env.PORT || port}`));


async function main() {

  const name = 'projects/1003391217227/secrets/ENV_VARIABLES/versions/1';

  const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

  const client = new SecretManagerServiceClient();

  async function accessSecretVersion() {
    const [version] = await client.accessSecretVersion({
      name: name,
    });
    console.log(version, "logged version")
    const payload = version.payload.data.toString();

    console.log(`Payload: ${payload}`);
  }
  accessSecretVersion();
}

main().catch(console.error);