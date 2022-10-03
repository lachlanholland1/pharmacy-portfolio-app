import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./PerformancecriteriasTableStyle.css";
import { confirmAlert } from "react-confirm-alert";


export default function PerformancecriteriasTable(props) {
  const params = useParams();
  const { auth } = useAuth();
  const [performancecriteriaData, setperformancecriteriaData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/performancecriterias-table", {
      method: "POST",
      body: JSON.stringify({ user: params.user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setperformancecriteriaData(data.performancecriterias_data);
      });
  }, []);

  return (
    <div>
      <div className={style.padding}>
        <h2>Performance Criterias</h2>
      </div>
      <table className={style.table}>
        <tr table className={style.tr}>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        <tbody>
          {performancecriteriaData.length ? (
            performancecriteriaData.map((performancecriteria) => (
              <tr table className={style.tr1}>
                <td>{performancecriteria.title}</td>
                <td>
                  {performancecriteria.description}
                </td>
                <td>
                  {performancecriteria.status}
                </td>
                <td >
                    <Link to={`/edit-performancecriterias/?id=${performancecriteria.idperformancecriteria}`}>
                      <button className={style.myButton}>Edit</button>
                    </Link>
                </td>
              </tr>
            ))
          ) : (
            <>
              <div>No performance criterias.</div>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
