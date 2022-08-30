import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ViewEvidence(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [evidenceData, setEvidenceData] = useState([]);
    const { auth, setAuth } = useAuth();

    localStorage.setItem("evidence_id", evidenceData.idevidenceitems);
    console.log("hi", id);
    // console.log(flag);

  useEffect(() => {
    //const request = { access_token: auth.access_token, user_id: auth.user_id };
    const request = {idevidenceitems: id};
    fetch("/api/viewevidence", { 
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })

      .then((response) => response.json())
    //   .then((data) => {console.log("bye",response); setEvidenceData(data.evidence_data)});
    //   .then((data) =>
    //     data.map((details) => ({
    //       title: details.title,
    //       description: details.description,
    //       impactstatement: details.impactstatement,
    //       comments: details.comments,
    //       idevidenceitems: details.idevidenceitems,
    //       procurementdate: details.procurementdate,
    //       uploaddate: details.uploaddate,
    //       attachment: details.attachment,
    //       users_id: details.users_id
    //     })))
        .then((details) => {
            // console.log("details",details);
            setEvidenceData(details);
          });
    //   .catch((err) => console.log("err"));
  }, []);
//if auth = user then have edit button? or have this on the profile page where they can go accorss to certain ones.
  return (
    <div>
        <h1> {evidenceData.title} </h1>
        <p> Date Created: {evidenceData.procurementdate}</p>
        <p> Date Uploaded: {evidenceData.uploaddate}</p>
        <p> Description: {evidenceData.description}</p>
        <p> Impact Statement: {evidenceData.impactstatement}</p>
        <p> Attachment: {evidenceData.attachment}</p>
        <p> User Id: {evidenceData.users_id}</p>
        <p> Reviews</p>
      {/* {evidenceData ? <ViewEvidenceForm evidenceData={evidenceData} /> : <></>} */}
      {/* //TO BE IMPLEMENTED - IF IT IS USER'S EVIDENCE THEY CAN HAVE THIS BUTTON  */}

          <Flagged id ={evidenceData.users_id}/>
          <br />
        <button type="submit" className={" button-primary"}>
            Review
          </button>
          <br />
          {/* //go back to whoever was logged - use AUTH.usernameeeeee */}
          {/* <Link to={"/" + data.username}>
            <button>Back</button>
            </Link> */}
    </div>
    
  );
}
function Flagged(id) {
    let user_id = localStorage.getItem("user_id"); //REPLACE WHEN AUTH IMPLEMENTED
    let evidence_id = localStorage.getItem("evidence_id"); //will be the id in the function as user id will be from AUTH
    var flag;
    if (id = user_id){
        flag = true; //can remove flag stuff
        return(<Link to={`/edit-evidence?id=${evidence_id}`}>
        <button>Edit</button>
      </Link>)
    }
    else {
        flag = false;
        return(null)
    }
}


