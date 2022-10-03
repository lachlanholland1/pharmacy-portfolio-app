import React, { useEffect, useState, useReducer, Alert } from "react";
import DatePicker from "react-multi-date-picker";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function EditDomainsForm({ domainData }) {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [userChanged, setUserChanged] = useState(false);

  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleChange = (event) => {
    setUserChanged(true);
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    setFormData({ name: "iddomains", value: domainData.iddomains });
  };
  

  function handleSubmit(e) {
    if (!userChanged) return;
    // uploadFile(selectedFile);
    e.preventDefault();
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/editdomains", {
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
    // navigate("/" + auth.username);
  }

console.log(auth.user_id, domainData);
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Edit Evidence</label>
        <br />
        <label>Title</label>
        <br />
        <input
          maxLength={65}
          type="text"
          id="title"
          placeholder={domainData.title}
          name="title"
          onChange={handleChange}
        />
        <br />
        <label>Description</label>
        <br />
        <input
          maxLength={255}
          type="text"
          placeholder={domainData.description}
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
          placeholder={domainData.status}
          id="status"
          name="status"
          onChange={handleChange}
        />
        <br />
        <div>
          <button type="submit">
            Submit
          </button>
          {/* temp fix */}
          <Link to={'/view-domains'}>
        <button>Back</button>
      </Link>
          {/* <Link to={`/evidence?id=${evidenceData.idevidenceitems}`}>
        <button>Back</button>
      </Link> */}
      <br />
        </div>
      </form>
    </div>
  );
//}

}

// function DeleteEvidence(id) {
//     // let user_id = localStorage.getItem("user_id"); //REPLACE WHEN AUTH IMPLEMENTED
//     function confirmedDelete() {
//         return fetch("/api/deleteevidence", {
//             method: "POST",
//             body: JSON.stringify(),
//             headers: { "Content-Type": "application/json" }
//           })
//             .then((res) => res.json())      
//             // .then(navigate("/" + auth.username))
//       }
    
//     return(
//     <div>
//     <label>
//         Are you sure?
//     </label>
//         <button onClick={(e) => confirmedDelete}>
//             Yes
//           </button>
//           <Link to={`/evidence?id=${id}`}>
//         <button>No</button>
//       </Link>
//     </div>
//     )
// }
