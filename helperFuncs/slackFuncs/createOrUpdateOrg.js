const { Workspaces } = require("../../server/db");
const findOrgOnGH = require("../queryFuncs/findOrgOnGH");

const createOrUpdateOrg = async (reqBody) => {
	const orgName = reqBody.view.state.values.OwnerName.Owner_Input.value;
	const orgToUpdate = await Workspaces.findOne({
		where: {
			teamID: reqBody.view.team_id,
		},
	});
	const doesOrgExist = await findOrgOnGH(reqBody);
	if (doesOrgExist) {
		return await orgToUpdate.update({ orgName: orgName });
	}
};

module.exports = createOrUpdateOrg;
