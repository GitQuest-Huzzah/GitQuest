const { Workspace } = require("../../server/db");
const findOrgOnGH = require("../queryFuncs/findOrgOnGH");

const createOrUpdateOrg = async (reqBody) => {
	const orgName = reqBody.view.state.values.OwnerName.Owner_Input.value;
    const ownerOrgSelect = reqBody.view.state.values.ownerOrOrg.ownerOrgSelect.selected_option.value
	const orgToUpdate = await Workspace.findOne({
		where: {
			teamID: reqBody.view.team_id,
		},
	});
		const doesOrgExist = await findOrgOnGH(reqBody);
		if (doesOrgExist) {
			return await orgToUpdate.update({ orgName: orgName, ghType: ownerOrgSelect });
		}
	}

module.exports = createOrUpdateOrg;
