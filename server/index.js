const {app} = require('./app');
const port = 8080;

console.log(process.env.TEST_ENV_VAR || "didn't work", "MAYBE TEST VAR")
app.listen(process.env.PORT || port, ()=> console.log(`Listening ${process.env.PORT || port}`));
