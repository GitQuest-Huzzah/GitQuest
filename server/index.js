const {app} = require('./app');
const port = 8080;
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

// Instantiates a client

(async () => {
    const name = 'projects/1003391217227/secrets/ENV_VARIABLES/versions/3'
    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
        name: name,
    });
    const payload = version.payload.data.toString('utf-8');
    console.log(payload, "payload payload")
    console.log(JSON.parse(payload), 'parse')
    // const parsedPayload = JSON.parse(payload)
    // process.env.DB_NAME = parsedPayload.DB_NAME
    // process.env.DB_PASSWORD = parsedPayload.DB_PASSWORD
    // process.env.DB_USER = parsedPayload.DB_USER
    // process.env.DB_CONNECTION = parsedPayload.DB_CONNECTION
    // console.log(process.env.DB_NAME, "did this work?")
    // console.log(parsedPayload, "payload")
    app.listen(process.env.PORT || port, ()=> console.log(`Listening ${process.env.PORT || port}`));
})();

// function getSecret() {
//     return client
//       .accessSecretVersion({
//         name: name,
//       })
//       .then((response) => response[0].payload.data.toString("utf-8"))
//   }
// accessSecretVersion()
// const payload = getSecret()
// console.log(payload,'payload')
console.log(process.env.DB_NAME, "db name env")
console.log(process.env.DB_PASSWORD, "db pass env")
console.log(process.env.DB_USER, "db user env")
console.log(process.env.DB_CONNECTION, "db conn env")
