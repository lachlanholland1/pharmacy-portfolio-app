import { stringify } from 'postcss';
import React ,{useState} from 'react';

export default function DownloadImageToS3(props) {

    var file = localStorage.getItem("attachment");
    var type = props.substr(props.length -3);

        const requestObject = {
                fileName: props,
                fileType: type
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