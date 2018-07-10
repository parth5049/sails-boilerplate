/**
 * S3Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var fs = require('fs');

// Configuring AWS SDK and S3 objects
var aws = require('aws-sdk');
var s3 = new aws.S3({ 
    "accessKeyId": process.env.aws_access_key_id,
    "secretAccessKey": process.env.aws_secret_access_key,
    "region": process.env.aws_region
});

module.exports = {
   
    /**
     * @method addFile
     * @desc Uploads given file into AWS S3 bucket. 
     * @param sourceFilePath - Absolute path of the source file that needs to be uploaded into S3 eg. /home/user/example.txt
     * @param fileName - File name without any path eg. example.txt
     * @param destinationDir - Destination directory in S3. Must be ending with a '/'. 
     * If you need to upload in the root, pass '/'. eg. /my-data/
     */
    addFile: function(sourceFilePath, fileName, destinationDir){
        fs.readFile(sourceFilePath, function(err, data){
            if (err) throw err;
            
            var fileParams = {
                Key : destinationDir+fileName,
                Body : data
            };

            s3.upload(fileParams, function(err, data){
                if(err){
                    console.log(err);
                    return false;
                }

                fs.unlink(sourceFilePath, function(err){
                    console.log(err)
                });

                console.log("File uploaded successfully");
                return true;
            })
        });

    },

    /**
     * @method deleteFile
     * @desc Deletes a file from S3
     * @param fileKey The file name which exists in S3
     */
    deleteFile: function(fileKey){

        s3.deleteObject({Key: fileKey}, function(err, data) {
            if (err) {
                console.log('There was an error deleting your photo: ', err.message);
                return false;
            }
            console.log('Successfully deleted file.');
            return true;
        });
    },

};

