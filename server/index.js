const {app} = require('./app');
const port = 8080;
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

// Instantiates a client

(async () => {
    const name = 'projects/1003391217227/secrets/ENV_VARIABLES/versions/10'
    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
        name: name,
    });
    const payload = version.payload.data.toString('utf-8');
    const stringed = JSON.stringify(payload)
    const parsedPayload = JSON.parse(stringed)
    
    console.log(JSON.stringify(parsedPayload), "stringed")
    console.log(parsedPayload.DB_NAME, "db name parsed")

    app.listen(process.env.PORT || port, ()=> console.log(`Listening ${process.env.PORT || port}`));
})();