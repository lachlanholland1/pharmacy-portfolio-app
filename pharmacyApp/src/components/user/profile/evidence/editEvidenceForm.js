import React, { useEffect, useState, useReducer } from "react";
import DatePicker from "react-multi-date-picker";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
              placeholder="Select date"
              format="YYYY-MM-DD"
              onChange={(date) => handleChangeDate(date)}
              selected={field.value}
            />
          )}
        />
        <br />
        {/* <label>Attachment</label>
        <br />
        <input
          maxLength={255}
          type="text"
          placeholder={evidenceData.attachment}
          id="attachment"
          name="attachment"
          onChange={handleChange}
        /> */}
        <br />
        <div>
          <button disabled={!userChanged} type="submit">
            Submit
          </button>
          <Link to={`/evidence?id=${evidenceData.idevidenceitems}`}>
        <button>Back</button>
      </Link>
        </div>
      </form>
    </div>
  );
}
