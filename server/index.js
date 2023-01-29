const {SecretManagerServiceClient} = require('@google-cloud/secret-manager').v1;
const {app} = require('./app');
const port = 8080;

app.listen(process.env.PORT || port, ()=> console.log(`Listening ${process.env.PORT || port}`));


async function main() {

  const name = 'projects/1003391217227/secrets/ENV_VARIABLES';

  // Imports the Secret Manager library
  const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

  // Instantiates a client
  const client = new SecretManagerServiceClient();

  async function getSecret() {
    const [secret] = await client.getSecret({
      name: name,
    });

    const policy = secret.replication.replication;

    console.info(`Found secret ${secret.name} (${policy})`);
  }

  getSecret();
}

const args = process.argv.slice(2);
console.log(args, "args log")
main().catch(console.error);