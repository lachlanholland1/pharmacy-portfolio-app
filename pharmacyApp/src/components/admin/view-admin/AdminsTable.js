import React, { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./AdminsTableStyle.css";

export default function AdminsTable(props) {
  console.log("Wat???");
  let navigate = useNavigate();
  const params = useParams();
  // const { auth } = useAuth();
  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
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

  // function handleOnClick(userid) {
  //   return navigate(`/evidence?id=${userid}`);
  // }

  return (
    <div>
      <div className={style.padding}>
        <h2>Administrators</h2>
      </div>
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
              <tr table className={style.tr2}>
                <td>{admin.email}</td>
                <td>
                  {admin.firstname} {admin.surname}
                </td>
                <td>{admin.alterprivileges}</td>
                <td>
                  <button>Delete Admin</button>
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
