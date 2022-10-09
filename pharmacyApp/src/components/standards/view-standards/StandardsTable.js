import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./StandardsTableStyle.css";


export default function StandardsTable(props) {
  const params = useParams();
  const { auth } = useAuth();
  const [standardData, setstandardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/standards-table", {
      method: "POST",
      body: JSON.stringify({ user: params.user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setstandardData(data.standards_data);
      });
  }, []);

  return (
    <div>
      <div className={style.padding}>
        <h2>Standards</h2>
      </div>
      <table className={style.table}>
        <tr table className={style.tr}>
          <th>Domain Title</th>
          <th>Standard Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        <tbody>
          {standardData.length ? (
            standardData.map((standard) => (
              <tr table className={style.tr1}>
                <td>
                  {standard.domainstitle}
                </td>
                <td>{standard.standardstitle}</td>
                <td>
                  {standard.description}
                </td>
                <td>
                  {standard.status}
                </td>
                <td >
                    <Link to={`/edit-standards/?id=${standard.idstandards}`}>
                      <button className={style.myButton}>Edit</button>
                    </Link>
                </td>
              </tr>
            ))
          ) : (
            <>
              <div>No standards.</div>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
