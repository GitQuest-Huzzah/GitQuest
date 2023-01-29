const {app} = require('./app');
const port = 8080;

app.listen(process.env.PORT || port, ()=> console.log(`Listening ${process.env.PORT || port}`));

if(process.env.DB_NAME) console.log("db name exists", process.env.DB_NAME)
if(process.env.DB_USER) console.log("db user exists", process.env.DB_USER)
if(process.env.DB_PASSWORD) console.log("db password exists", process.env.DB_PASSWORD)
if(process.env.DB_CONNECTION) console.log("db connection exists", process.env.DB_CONNECTION)
if(process.env.SLACK_CLIENT_ID) console.log("slack ID exists", process.env.SLACK_CLIENT_ID)
if(process.env.SLACK_CLIENT_SECRET) console.log("slack secret exists", process.env.SLACK_CLIENT_SECRET)
if(process.env.GH_CLIENT_SECRET) console.log("gh secret exists", process.env.GH_CLIENT_SECRET)
if(process.env.GH_CLIENT_ID) console.log("gh ID exists", process.env.GH_CLIENT_ID)