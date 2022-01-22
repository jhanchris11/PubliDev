import AWS from 'aws-sdk'
import config from '../config'
import fs from 'fs'
const s3 = new AWS.S3()

const uploadFile = (fileContent, key) => {
  return s3
    .upload(
      {
        Bucket: config.AWS_BUCKET_NAME,
        Body: fileContent,
        Key: key
        // ACL: 'public-read'
      },
      (err, data) => {
        if (err) throw err
      }
    )
    .promise()
}
const getFileStream = (fileKey) => {
  const downloadParams = {
    Bucket: config.AWS_BUCKET_NAME,
    Key: fileKey
  }
  return s3.getObject(downloadParams).createReadStream()
}
export { uploadFile, getFileStream }
