import { stringify } from 'postcss';
import React ,{useState} from 'react';

const DownloadImageToS3 = () => {

    var file = localStorage.getItem("attachment");
    console.log(file);
    
    var type = file.substr(file.length -3);
    console.log(type);

    const downloadFile = () => {

        const requestObject = {
                fileName: file,
                fileType: type //do I need type?
                // fileType: "image/png" //file.type
        }
       console.log(requestObject.fileName);
       console.log(requestObject.fileType);
       
        fetch('/api/download',{
            method: "POST",
            body: JSON.stringify(requestObject),
            headers: { "Content-Type": "application/json" }, 
        })
        .then(res => res.json())
        .then((data) => {window.open(data.signedUrl, '_blank').focus()})
    }


    return <>
        <button onClick={() => downloadFile()}>View Evidence</button>
    </>
}

export default DownloadImageToS3;