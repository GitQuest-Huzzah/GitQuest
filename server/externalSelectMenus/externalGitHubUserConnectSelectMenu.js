const { gitHubOrgAllUsers } = require("../gitFuncs")

const externalGitHubUserConnectSelectMenu = async(reqBody) =>{
   const allMembers = await gitHubOrgAllUsers(reqBody)
   const memberGHAccounts = allMembers.data.map((member)=> member.login)
   console.log(memberGHAccounts, "all member")
}

module.exports = externalGitHubUserConnectSelectMenu;