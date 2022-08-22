import React ,{useState} from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET ='pharmacyappbucket';
const REGION ='ap-southeast-2';

AWS.config.update({
    accessKeyId: 'AKIA3HRE4ZH3WV6OPTVM',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadImageToS3WithNativeSdk = () => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
            // Key: "choosingAName" //then need the .jpg or .png .pdf etc
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


    return <div>
        <div>File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithNativeSdk;