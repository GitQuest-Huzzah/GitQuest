const {app} = require('./app');
const port = 8080;
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
app.listen(process.env.PORT || port, ()=> console.log(`Listening ${process.env.PORT || port}`));

const name = 'projects/1003391217227/secrets/ENV_VARIABLES/versions/1'
// Instantiates a client
const client = new SecretManagerServiceClient();


 const accessSecretVersion = async() => {
    console.log("accessing maybe this time?")
  const [version] = await client.accessSecretVersion({
    name: name,
  });
  return version.payload.data.toString();

}
console.log(accessSecretVersion(), "return from secrets");
