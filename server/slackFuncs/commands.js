const { WebClient } = require('@slack/web-api')
const web  = new WebClient()

const gitWorkFlow = async(reqBody, res)=>{

    console.log("This is the req body", reqBody)


    await web.chat.postMessage({
        text: "Hello world",
        channel: reqBody.user_id,
        token: '***REMOVED***'
    })
}

module.exports = gitWorkFlow 
