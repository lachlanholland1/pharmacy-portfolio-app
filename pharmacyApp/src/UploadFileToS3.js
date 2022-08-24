import React ,{useState} from 'react';
import urlProducer from './urlProducer';

//const UploadImageToS3 = () => {
// const UploadImageToS3 = (file) => {
    export default function UploadImageToS3(file){
    // if (file != null) {
    //     uploadFile(file);
    // }
    // const [selectedFile, setSelectedFile] = useState(null);

    //const handleFileInput = (e) => setSelectedFile(e.target.files[0]);
    // uploadFile(file);
    const uploadFile = (file) => {

        const requestObject = {
                //fileName: urlProducer(file.name),//"file.name" ,  
                fileName: file.name,    
                fileType: file.type
        }
       console.log(requestObject.fileName);
       console.log(requestObject.fileType);
       
        fetch('/api/upload',{
            method: "POST",
            body: JSON.stringify(requestObject),
            headers: { "Content-Type": "application/json" }, 
        })
        .then(res => res.json())
        .then((data) => {
            fetch(data.signedUrl , {
                method:'PUT',
                body :file
            }).then((res) => {
                // DO WHATEVER YOU WANT
            })
        })
                   

    }


    // return <>
    //     <input type="file" onChange={handleFileInput}/>
    //     <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    // </>
    // return (

    // );
}

// export default UploadImageToS3();