const { app } = require("./app");
const port = 8080;

//name is the resource value for our secrets in secret manager
(async () => {
	app.listen(process.env.PORT || port, () =>
		console.log(`Listening ${process.env.PORT || port}`)
	);
})();
//finally we start the server
