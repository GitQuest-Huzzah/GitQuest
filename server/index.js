const {app} = require('./app');
const Bots = require('./db/models/Bots');
const port = 8080;

(async () => await Bots.create({
    token: "Token123",
    teamID: "teamID123",
    teamName: "teamName123"
}))();

app.listen(process.env.PORT || port, ()=> console.log(`Listening ${process.env.PORT || port}`));
