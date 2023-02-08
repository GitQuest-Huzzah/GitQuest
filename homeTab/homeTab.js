const { WebClient } = require("@slack/web-api");
const { createAdminGHLink, findTokenByTeamId } = require("../helperFuncs");
const { Users } = require("../server/db");
const adminHomeView = require("./adminHomeView");
const userHomeView = require("./userHomeView");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
// Listen to the app_home_opened Events API event to hear when a user opens your app from the sidebar
const homeTab = async (reqBody) => {
	const token = await findTokenByTeamId(reqBody.team_id);
	const user = await Users.findOne({
		where: {
			slackID: reqBody.event.user,
		},
	});
	const gHLink = createAdminGHLink({
		teamId: reqBody.team_id,
		userId: reqBody.event.user,
	});
	try {
		// Call the views.publish method using the WebClient passed to listeners
		await web.views.publish({
			user_id: reqBody.event.user,
			token: token,
			view: {
				// Home tabs must be enabled in your app configuration page under "App Home"
				type: "home",
				blocks: user.dataValues.isAdmin
					? adminHomeView(user, gHLink)
					: userHomeView(user),
			},
		});
	} catch (error) {
		console.error(error);
	}
};

module.exports = homeTab;
