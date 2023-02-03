const { app } = require("./app");
require('dotenv').config();
(async () => {
	app.listen(process.env.PORT, () =>
		console.log(`Listening ${process.env.PORT}`)
	);
})();
