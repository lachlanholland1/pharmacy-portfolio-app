import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import useAuth from "../../hooks/useAuth";
import DownloadImageToS3 from "../../DownloadFileToS3";
import urlProducer from "../../urlProducer";
import { useNavigate } from "react-router-dom";
import style from "./AddEvidenceStyle.css";


const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function AddEvidenceForm() {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const [date, setDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState(null);
  const [attachmentData, setAttachmentData] = useState("");
  const navigate = useNavigate();
  
  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  var attachment;

  const handleFileInput = (e) => {
  if (e.target.files[0].size > 10000000){
    console.log("Error: File size must be below 10mb!");
    setErrors('Error: File size must be below 10mb!')
  }
  else {
    setErrors('');
    setSelectedFile(e.target.files[0]); 
    attachment = urlProducer(e.target.files[0].name);
    setAttachmentData(attachment);
    setFormData({name: "attachment", value: attachment});
    console.log(e.target.files[0].type);
  }
  if (e.target.files[0].type != "application/pdf" && e.target.files[0].type != "image/jpeg" &&
  e.target.files[0].type != "image/png" && e.target.files[0].type != "text/csv" &&
  e.target.files[0].type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && 
  e.target.files[0].type != "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
  e.target.files[0].type != "application/msword" && e.target.files[0].type != "video/mp4" && 
  e.target.files[0].type != "audio/mpeg" && e.target.files[0].type != "application/vnd.ms-powerpoint" && 
  e.target.files[0].type != "audio/wav" && e.target.files[0].type != "application/vnd.ms-excel" && 
  e.target.files[0].type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
    setErrors('Error: Invalid file format!');
    console.log('Error: Invalid file format!');
  }
  else {
    setErrors('');
  }
}
  const [errors1, setErrors] = useState("");



function uploadFile(file){
  console.log(attachmentData);
  const requestObject = {
          fileName: attachmentData,
          fileType: file.type
  }
//  console.log(requestObject.fileName);
//  console.log(requestObject.fileType);
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
          // DO WHATEVER
      })
  })
};

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };
  const handleChangeDate = (date) => {
    setFormData({
      name: "date",
      value: date.toString().concat(" 00:00:00"),
    });
    setFormData({ name: "userId", value: auth.user_id });
  }

  function handleSubmit(e) {
    uploadFile(selectedFile);
    e.preventDefault();
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/createevidence", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      setLoading(false);
      if (!response.ok) {
        setFormIsVisible(true);
        setIsSuccess(0);
      } else {
        setFormIsVisible(false);
        setIsSuccess(1);
      }
    });
    navigate("/" + auth.username);
  }
  return (
    <div>
    <div className={style.container}>
    <div className={style.sign}>
      <h1 className={style.center}>Add Evidence</h1>
      <form onSubmit={handleSubmit }>
        <label className={style.padding}>Evidence Title</label>
        <br />
        <input
          className={style.myForm1}
          maxLength={65}
          type="text"
          id="title"
          placeholder="Enter the title of your evidence"
          name="title"
          required
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Description</label>
        <br />
        <textarea 
          rows='2' 
          cols='52'
          className={style.myForm2}
          maxLength={255}
          placeholder="Enter the description for your evidence (max 255 character length)"
          required
          id="description"
          name="description"
          onChange={handleChange}>
          </textarea>
        <br />
        <label className={style.padding}>Impact Statement</label>
        <br />
        <textarea 
          className={style.myForm3}
          maxLength={255}
          placeholder="Enter the impact statement for your evidence (max 255 character length)"
          required
          id="impactstatement"
          name="impactstatement"
          onChange={handleChange}>
          </textarea>
        <br />
        <label className={style.padding}>Date</label>
        <br />
        <Controller
          control={control}
          name="dateInput"
          render={({ field }) => (
            <DatePicker
              style={{"width": '390px',
               'margin-bottom': '15px',
                'border': '2px solid lightgray',
                'border-radius': '5px',
                'padding-left': '10px'}}
              name="date"
              id="date"
              placeholder="Select date"
              format="YYYY-MM-DD"
              onChange={(date) => handleChangeDate(date)}
              selected={field.value}
              
            />
          )}
        />
        <br />
        <label className={style.padding}>Evidence Attachment</label>
        <br />
        <input
          id="fileInput"
          type="file"
          onChange={handleFileInput}
          required
        />
        <p style={{ color: "red", padding: 5, margin: 0, fontSize: 14 }}>
          {errors1}
        </p>
        <br />
        {/* <DownloadImageToS3 /> 
        {//^^^Download Image to be used later. */}
        <div className={style.center}>
          <button className={style.myButton} type="submit">
            Submit
          </button>
        </div>
      </form>    
    </div>
    </div>
    <div>
          <p>Disclaimer: When adding evidence attachments please ensure all personal or private information relating to yourself or others 
            remains confidential if/when required as public portfolio’s will be viewable by all entities. Please also ensure each file upload is kept under 10MB.</p>
        </div>
    </div>
    
  );
}
