const {app} = require('./app');
const port = 8080;
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
app.listen(process.env.PORT || port, ()=> console.log(`Listening ${process.env.PORT || port}`));

const name = 'projects/1003391217227/secrets/ENV_VARIABLES/versions/1'
// Instantiates a client
const client = new SecretManagerServiceClient();


 const accessSecretVersion = async () => {
    console.log("accessing maybe this time?")
  return await client.accessSecretVersion({
    name: name,
  });
//   const  = version.payload.data.toString();
//   process.env.DB_NAME = payload.DB_NAME
//   process.env.DB_PASSWORD = payload.DB_PASSWORD
//   process.env.DB_USER = payload.DB_USER
//   process.env.DB_CONNECTION = payload.DB_CONNECTION
//   console.log(payload, "payload inside function")
//   return payload
}
console.log(accessSecretVersion(),"function")
console.log(process.env.DB_NAME, "db name env")
console.log(process.env.DB_PASSWORD, "db pass env")
console.log(process.env.DB_USER, "db user env")
console.log(process.env.DB_CONNECTION, "db conn env")
