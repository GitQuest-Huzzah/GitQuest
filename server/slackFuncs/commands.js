const { WebClient } = require('@slack/web-api')
const web  = new WebClient()

const gitWorkFlow = async(reqBody, res)=>{

    console.log("This is the req body", reqBody)


    await web.chat.postMessage({
        text: "Hello world",
        channel: reqBody.user_id,
        token: 'xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i'
    })
}

module.exports = gitWorkFlow 
