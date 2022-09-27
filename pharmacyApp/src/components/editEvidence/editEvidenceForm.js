import React, { useEffect, useState, useReducer, Alert } from "react";
import DatePicker from "react-multi-date-picker";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
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
export default function EditEvidenceForm({ evidenceData }) {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [userChanged, setUserChanged] = useState(false);
  var procureDate = String(evidenceData.procurementdate);

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
    setFormData({ name: "idevidenceitems", value: evidenceData.idevidenceitems });
  };
  const handleChangeDate = (date) => {
    setUserChanged(true);
    setFormData({
      name: "date",
      value: date.toString().concat(" 00:00:00"),
    });
    setFormData({ name: "idevidenceitems", value: evidenceData.idevidenceitems });
  }

  function handleSubmit(e) {
    if (!userChanged) return;
    // uploadFile(selectedFile);
    e.preventDefault();
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/editevidence", {
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

  const submit = () => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          // onClick: () => alert("Click Yes")
          onClick: () => fetch("/api/deleteevidence", {
            method: "POST",
            body: JSON.stringify({idevidenceitems: evidenceData.idevidenceitems}),
            headers: { "Content-Type": "application/json" }
          })
            .then((res) => res.json())
            .then(navigate("/" + auth.username))
        },
        {
          label: "No",
          onClick: () => navigate("/" + auth.username)
          //onClick: () => alert("Click No")
        }
      ]
    });
  };

console.log(auth.user_id, evidenceData.users_id);
  if (auth.user_id != evidenceData.users_id) {
    console.log("Not authorised.");
    return(
      <div>
        <label>You are unauthorised to access this page.
        </label>
        <br />
        <Link to={"/login"}>
        <button>Login</button>
      </Link>
        </div>
    )
  }

    
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
          placeholder={evidenceData.title}
          name="title"
          onChange={handleChange}
        />
        <br />
        <label>Description</label>
        <br />
        <input
          maxLength={255}
          type="text"
          placeholder={evidenceData.description}
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
          placeholder={evidenceData.impactstatement}
          id="impactstatement"
          name="impactstatement"
          onChange={handleChange}
        />
        <br />
        <label>Procurement Date</label>
        <br />
        <Controller
          control={control}
          name="dateInput"
          render={({ field }) => (
            <DatePicker
              name="date"
              id="date"
              placeholder={procureDate.slice(0, -14)}
              format="YYYY-MM-DD"
              onChange={(date) => handleChangeDate(date)}
              selected={field.value}
            />
          )}
        />
        <br />
        <div>
          <button disabled={!userChanged} type="submit">
            Submit
          </button>
          {/* temp fix */}
          <Link to={'/' + auth.username}>
        <button>Back</button>
      </Link>
          {/* <Link to={`/evidence?id=${evidenceData.idevidenceitems}`}>
        <button>Back</button>
      </Link> */}
      <br />
        </div>
      </form>
      <div>
        <button onClick={submit}>Delete Evidence</button>
        </div>
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
