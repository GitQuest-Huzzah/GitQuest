const { gitHubOrgAllUsers } = require("../gitFuncs")

const externalGitHubUserConnectSelectMenu = async(reqBody) =>{
   const allMembers = await gitHubOrgAllUsers(reqBody)
   const memberGHAccounts = allMembers.data.map((member)=> member)
   console.log(memberGHAccounts, "all member")
   
   const optionsArray = memberGHAccounts.reduce((acc, member) => {
    console.log(member.login, member.id)
    let currentLogin = {
        text: {
            type: "plain_text",
            text: `${member.login}`,
        },
        value: `${member.id}`,
    };
    acc.push(currentLogin);
    return acc;
}, []);
return { options: optionsArray }
}

module.exports = externalGitHubUserConnectSelectMenu;