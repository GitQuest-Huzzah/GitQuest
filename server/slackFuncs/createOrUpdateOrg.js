const { Workspaces } = require("../db");
const { findOrgOnGH } = require("../gitFuncs");

const createOrUpdateOrg = async ({ team_id, orgName }) => {
	const orgToUpdate = await Workspaces.findOne({
		where: {
			teamID: team_id,
		},
	});
	const doesOrgExist = await findOrgOnGH(orgName);
	if (doesOrgExist) {
		return await orgToUpdate.update({ orgName: orgName });
	}
};

module.exports = createOrUpdateOrg;
