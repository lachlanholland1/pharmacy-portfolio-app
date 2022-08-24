import React ,{useState} from 'react';

const DownloadImageToS3 = () => {

    // const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileInput = (e) => setSelectedFile(e.target.files[0]);

    const downloadFile = () => {

        const requestObject = {
                fileName: "retrowave_80_s_bg_by_rafael_de_jongh-d9wsq5j.png",//file.name ,
                fileType: "image/png" //file.type
        }
       console.log(requestObject.fileName);
       console.log(requestObject.fileType);
       
        fetch('/api/download',{
            method: "POST",
            body: JSON.stringify(requestObject),
            headers: { "Content-Type": "application/json" }, 
        })
        .then(res => res.json())
        .then((data) => {console.log(data.signedUrl)})
            
                  

    }


    return <>
        {/* <div>
        <label>File Name</label>
        <br />
        <input
          maxLength={65}
          type="text"
          id="title"
          name="title"
        /> */}
        {/* <input type="file" onChange={handleFileInput}/> */}
        <button onClick={() => downloadFile()}> Upload to S3</button>
        {/* </div> */}
    </>
}

export default DownloadImageToS3;