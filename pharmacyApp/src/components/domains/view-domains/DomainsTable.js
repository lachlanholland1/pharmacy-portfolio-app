import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./DomainsTableStyle.css";
import { confirmAlert } from "react-confirm-alert";


export default function DomainsTable(props) {
  let navigate = useNavigate();
  const params = useParams();
  const { auth } = useAuth();
  const [domainData, setdomainData] = useState([]);
  useEffect(() => {
    fetch("/api/domains-table", {
      method: "POST",
      body: JSON.stringify({ user: params.user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setdomainData(data.domains_data);
      });
  }, []);

  // const submit = (domain_id) => {
  //   confirmAlert({
  //     title: "Confirm to Delete",
  //     message: "Are you sure want to delete the user as a domain?",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         // onClick: () => alert("Click Yes")
  //         onClick: () => fetch("/api/deletedomain", {
  //           method: "POST",
  //           body: JSON.stringify({domain_id: domain_id}),
  //           headers: { "Content-Type": "application/json" }
  //         })
  //           .then((res) => res.json())
  //           .then(navigate("/view-domains"))
  //       },
  //       {
  //         label: "No",
  //         onClick: () => navigate("/view-domains")
  //         //onClick: () => alert("Click No")
  //       }
  //     ]
  //   });
  // };

  // function handleOnClick(userid) {
  //   return navigate(`/evidence?id=${userid}`);
  // }

  return (
    <div>
      <div className={style.padding}>
        <h2>Domains</h2>
      </div>
      <table className={style.table}>
        <tr table className={style.tr}>
          <th>User Email</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
        <tbody>
          {domainData.length ? (
            domainData.map((domain) => (
              <tr table className={style.tr1}>
                <td>{domain.email}</td>
                <td>
                  {domain.firstname} {domain.surname}
                </td>
                <td >
                  {/* Need to validate that the current domain has Alter privileges */}
                    {/* <button className={style.myButton} onClick={() => submit(domain.iddomains)}>Delete</button> */}
                    <button className={style.myButton} >Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <>
              <div>No domains.</div>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
