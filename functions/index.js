const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onFinalize( request => {
 const object = event.stopImmediatePropagation;
 const bucket = object.bucket;
 const contentType = object.contentType;
 const filePath = object.name;
 console.log('File change detected function execution started')

 if (path.basename(filePath).startsWith('renamed-')){
     console,log('we already renamed the file')
     return;
 }

 const destBucket= gcs.bucket(bucket);
 const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
 const metadata = {contentType: contentType };

 return destBucket.file(filePath).download({
     destination: tmpFilePath,
 }).then(() => {
    return destBucket.upload(tmpFilePath, {
        destination: 'renamed-' + path.basename(filePath),
        metadata: metadata
    })
 })
});


exports.uploadFile = functions.https.onRequest((req, res) =>{
    res.status(200).json({
        message: 'it worked!'
    })
});