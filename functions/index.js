
const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");
const {Storage} = require('@google-cloud/storage');

const gcconfig = {
  projectId: "reactpets-be223",
  keyFilename: "reactpets-be223-firebase-adminsdk-f34uh-5e6ca4ee22.json"
};

const gcs = new Storage({gcconfig});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.onFileChange = functions.storage.object().onFinalize(event => {
//   const object = event.data;
//   const bucket = gcs.bucket("reactpets-be223.appspot.com");
//   const contentType = object.contentType;
//   const filePath = object.name;
//   console.log("File change detected, function execution started");

//   if (object.resourceState === "not_exists") {
//     console.log("We deleted a file, exit...");
//     return;
//   }

//   if (path.basename(filePath).startsWith("resized-")) {
//     console.log("We already renamed that file!");
//     return;
//   }

//   const destBucket = gcs.bucket(bucket);
//   const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
//   const metadata = { contentType: contentType };
//   // eslint-disable-next-line consistent-return
//   return destBucket
//   .file(filePath)
//     .download({
//       destination: tmpFilePath
//     })
//     .then(() => {
//       return spawn("convert", [tmpFilePath, "-resize", "500x500", tmpFilePath]);
//     })
//     .then(() => {
//       return destBucket.upload(tmpFilePath, {
//         destination: "resized-" + path.basename(filePath),
//         metadata: metadata
//       });
//     });
// });

const admin = require("firebase-admin");
serviceAccount = require("./"+gcconfig.keyFilename);
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
storageBucket: "reactpets-be223.appspot.com"
});

exports.uploadFile = functions.https.onRequest((req, res) => {
    console.log('here');
    res.header( 'Access-Control-Allow-Origin', '*' );
    res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header( 'Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    if (req.method === "OPTIONS") {
        console.log('here in options')
        return res.status(200).json({});
    }
    else {
        console.log('here 2')
    }
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed"
      });
    }
    console.log('past the post check')
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;
    console.log(req.headers);

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log(filename);
      filename = "123"+Date.now() + filename; 
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
      //const bucket = gcs.bucket("reactpets-be223.appspot.com");
      const bucket = admin.storage().bucket();
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        // eslint-disable-next-line promise/always-return
        .then((fileUploaded) => {
            console.log(fileUploaded[0])
            const file = bucket.file(fileUploaded[0].metadata.name);
            // eslint-disable-next-line promise/no-nesting
            return file.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
            // eslint-disable-next-line promise/always-return
            }).then(signedUrls => {
            res.status(200).json({
                fileUrl: signedUrls[0]
              });
            });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
});