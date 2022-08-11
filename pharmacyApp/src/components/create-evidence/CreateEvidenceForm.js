import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
const formreducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value,
    };
  };
export default function CreateEvidenceForm(){
    const [formIsVisible, setFormIsVisible] = useState(true);
    const [isSuccess, setIsSuccess] = useState(-1);
    const [formData, setFormData] = useReducer(formreducer, {});
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

  
    const [date, setDate] = useState(new Date());
    const {
        // handleSubmit,
        watch,
        control,
        formState: { errors }
      } = useForm();
       const onSubmit = (data) => console.log(data);
      
      const handleChange = (event) => {
        setFormData({
          name: event.target.name,
          value: event.target.value,
        });
      };
      const handleChangeDate = (date) => {
        console.log(date.toString());
        setFormData({
          name: "date",
          value: date.toString(),
        });
      };
      
      function handleSubmit(e) {
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
            <form onSubmit={handleSubmit}>
           
                {/* add a bit about onSubmit?? */}
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
                    // id="date"
                    // onChange={this.handleChange}
                    // required
                    render={({ field }) => (
                        <DatePicker
                            name="date"
                            id="date"
                            placeholder="Select date"
                            format='DD-MM-YYYY'
                            // onChange={(date) => field.onChange(date)}
                            // onChange={(date) => console.log(date)}
                            onChange={(date) => handleChangeDate(date)}
                            selected={field.value}
                            
                        /> )}                  
                />
                <br />
                <label>Evidence Attachment</label>
                <br />
                <input
                id="fileInput"
                type="file"
                // onChange={handleChange}
                />
                <div>
                    <button type="submit" className={" button-primary"}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
