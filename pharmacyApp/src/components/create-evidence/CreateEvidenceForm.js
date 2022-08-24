import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import useAuth from "../../hooks/useAuth";
import UploadImageToS3WithNativeSdk from "../../../UploadImageToS3WithNativeSdk";
import UploadImageToS3 from "../../UploadFileToS3";
import DownloadImageToS3 from "../../DownloadFileToS3";
import urlProducer from "../../urlProducer";


const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function CreateEvidenceForm() {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const [date, setDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState(null);
  const [attachmentData, setAttachmentData] = useState("");

  let userId = localStorage.getItem("userId");
  console.log(userId);

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
    setSelectedFile(e.target.files[0]); 
    attachment = urlProducer(e.target.files[0].name);
    setAttachmentData(attachment);
    setFormData({name: "attachment", value: attachment});
  }}
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
          // DO WHATEVER YOU WANT
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
    setFormData({ name: "userId", value: userId });
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
  }
  return (
    <div>
      <h1>Add Evidence</h1>
      <form onSubmit={handleSubmit }>
        <label>Evidence Title</label>
        <br />
        <input
          maxLength={65}
          type="text"
          id="title"
          placeholder="Enter the title of your evidence"
          name="title"
          required
          onChange={handleChange}
        />
        <br />
        <label>Description</label>
        <br />
        <input
          maxLength={255}
          type="text"
          placeholder="Enter the description for your evidence (max 255 character length)"
          required
          id="description"
          name="description"
          onChange={handleChange}
        />
        <br />
        <label>Impact Statement</label>
        <br />
        <input
          maxLength={255}
          type="text"
          placeholder="Enter the impact statement for your evidence (max 255 character length)"
          required
          id="impactstatement"
          name="impactstatement"
          onChange={handleChange}
        />
        <br />
        <label>Date</label>
        <br />
        <Controller
          control={control}
          name="dateInput"
          render={({ field }) => (
            <DatePicker
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
        <label>Evidence Attachment</label>
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
        <DownloadImageToS3 /> 
        {/* {//^^^ TO BE MOVED} JUST A PLACEHOLDER */}
        <div>
          <button type="submit" className={" button-primary"}>
            Submit
          </button>
        </div>
        <div>
          <p>Disclaimer: When adding evidence attachments please ensure all personal or private information relating to yourself or others 
            remains confidential if/when required as public portfolio’s will be viewable by all entities. Please also ensure each file upload is kept under 10MB.</p>
        </div>
      </form>
    </div>
  );
}
