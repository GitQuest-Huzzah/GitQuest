const { app } = require("./app");

//name is the resource value for our secrets in secret manager
	app.listen(process.env.PORT, () =>
		console.log(`Listening ${process.env.PORT}`))
