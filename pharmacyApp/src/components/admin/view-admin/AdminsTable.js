import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./AdminsTableStyle.css";
import { confirmAlert } from "react-confirm-alert";


export default function AdminsTable(props) {
  let navigate = useNavigate();
  const params = useParams();
  const { auth, setAuth } = useAuth();
  const [adminData, setAdminData] = useState([]);
  const [admins, setAdmins] = useState(null);

  useEffect(() => {
    const adminRequest = { users_id: auth.users_id };
    fetch("/api/checkadmins", {
      method: "POST",
      body: JSON.stringify(adminRequest),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((adminDetails) => {
        if (adminDetails.length > 0) {
          setAdmins(true);
        } else {
          setAdmins(false);
        }
      });

    fetch("/api/admins-table", {
      method: "POST",
      body: JSON.stringify({ user: params.user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAdminData(data.admins_data);
      });

  }, []);

  const submit = (admin_id) => {

    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure want to remove the user as an admin?",
      buttons: [
        {
          label: "Yes",
          // onClick: () => alert("Click Yes")
          onClick: () => fetch("/api/deleteadmin", {
            method: "POST",
            body: JSON.stringify({admin_id: admin_id}),
            headers: { "Content-Type": "application/json" }
          })
            .then((res) => res.json())
            .then(navigate("/view-admins"))
        },
        {
          label: "No",
          onClick: () => navigate("/view-admins")
          //onClick: () => alert("Click No")
        }
      ]
    });
  };
  return (
    <div>
        <h2>Administrators</h2>
      <table className={style.table}>
        <tr table className={style.tr}>
          <th>User Email</th>
          <th>Name</th>
          <th>Privileges</th>
          <th>Action</th>
        </tr>
        <tbody>
          {adminData.length ? (
            adminData.map((admin) => (
              <tr table className={style.tr1}>
                <td>{admin.email}</td>
                <td>
                  {admin.firstname} {admin.surname}
                </td>
                <td>{admin.alterprivileges}</td>
                <td >
                  {/* Need to validate that the current Admin has Alter privileges */}
                    {admins ? (
                      <button className={style.myButton} onClick={() => submit(admin.idadministrators)}>Delete</button>
                    ) : ("")}
                </td>
              </tr>
            ))
          ) : (
            <>
              <div>No Administrators.</div>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
