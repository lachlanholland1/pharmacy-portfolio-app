import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import style from "./EditAccountStyle.css";
import urlProducer from "../../urlProducer";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function EditAccountForm({ userData }) {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const [userChanged, setUserChanged] = useState(false);
  const [attachmentData, setAttachmentData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors1, setErrors] = useState("");

  var attachment;

  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleChange = (event) => {
    setUserChanged(true);
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  const handleFileInput = (e) => {
    if (e.target.files[0].size > 10000000){
      console.log("Error: File size must be below 1mb!");
      setErrors('Error: File size must be below 1mb!')
    }
    else if (e.target.files[0].type != "application/pdf" && e.target.files[0].type != "image/jpeg" &&
    e.target.files[0].type != "image/png"){
      setErrors('Error: Invalid file format!');
      console.log('Error: Invalid file format!');
    }
    else {
      setUserChanged(true);
      setErrors('');
      setSelectedFile(e.target.files[0]); 
      attachment = urlProducer(e.target.files[0].name);
      setAttachmentData(attachment);
      setFormData({name: "attachment", value: attachment});
      console.log(e.target.files[0].type);
    }
  }
  
  function uploadFile(file){
    console.log(attachmentData);
    const requestObject = {
            fileName: attachmentData,
            fileType: file.type
    }
    fetch('api/upload',{
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
        })
    })
  };

  function handleSubmit(e) {
    uploadFile(selectedFile);
    e.preventDefault();
    const request = {
      edit_account: formData,
      access_token: auth.access_token,
      user_id: auth.user_id,
    };
    if (!userChanged) return;
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/edit-account", {
      method: "POST",
      body: JSON.stringify(request),
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
    <div className={style.container}>
    <div className={style.sign}>
      <form onSubmit={handleSubmit}>
        <label className={style.padding}>First Name</label>
        <br />
        <input
          className={style.myForm}
          maxLength={65}
          type="text"
          id="first_name"
          placeholder={userData.firstname}
          name="first_name"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Last name</label>
        <br />
        <input
          className={style.myForm}
          maxLength={255}
          type="text"
          placeholder={userData.surname}
          id="last_name"
          name="last_name"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Username</label>
        <br />
        <input
          className={style.myForm}
          maxLength={255}
          type="text"
          placeholder={userData.username}
          id="username"
          name="username"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Bio</label>
        <br />
        <input
          className={style.myForm}
          maxLength={255}
          type="text"
          placeholder={userData.description}
          id="bio"
          name="bio"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Email</label>
        <br />
        <input
          className={style.myForm}
          maxLength={255}
          type="text"
          placeholder={userData.email}
          id="email"
          name="email"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Mobile</label>
        <br />
        <input
          className={style.myForm}
          maxLength={255}
          type="text"
          placeholder={userData.mobile}
          id="mobile"
          name="mobile"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Profile Picture</label>
        <br />
        <input
          id="fileInput"
          type="file"
          onChange={handleFileInput}
        />
        <br />
        <div className={style.center}>
        <input
          type="checkbox"
          name="private-account"
          onChange={handleChange}
          step="1"
        />
        <label className={style.checkboxPadding}>Private account</label>
        <br />
        </div>
        <div className={style.center}>
          <button className={style.myButton} disabled={!userChanged} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}
