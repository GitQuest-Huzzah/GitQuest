// const {Storage} = require("@google-cloud/storage");
// const path = require('path');

// // get the keys to our bucket and it's location, stringify the request body, pick the bucket to save to, apply a timestamp as the file name, then save the buffered file
// const writeFileToBucket = (req) => {
//     const gcloud = new Storage()
//     const requestToLog = (JSON.stringify(req.headers).concat("<<<----REQUEST HEADERS_________REQUEST BODY---->>>").concat(JSON.stringify(req.body)))

//     const logBucket = gcloud.bucket('gitgoingslackbot.appspot.com')
//     const timeStamp = new Date
//     const file = logBucket.file(timeStamp.toString());
    
//     const fileToLog = Buffer.from(requestToLog, 'utf-8');
//     file.save(fileToLog).then(() => {
//        console.log("file written")
//     }).catch(error => {
//         console.error(error)
//     });
// }
// module.exports = writeFileToBucket