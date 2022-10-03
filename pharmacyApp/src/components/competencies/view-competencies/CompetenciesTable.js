import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./CompetenciesTableStyle.css";


export default function CompetenciesTable(props) {
  const params = useParams();
  const { auth } = useAuth();
  const [competencyData, setcompetencyData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/competencies-table", {
      method: "POST",
      body: JSON.stringify({ user: params.user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setcompetencyData(data.competencies_data);
      });
  }, []);

  return (
    <div>
      <div className={style.padding}>
        <h2>Competencies</h2>
      </div>
      <table className={style.table}>
        <tr table className={style.tr}>
          <th>Standard Title</th>
          <th>Competency Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        <tbody>
          {competencyData.length ? (
            competencyData.map((competency) => (
              <tr table className={style.tr1}>
                <td>
                  {competency.standardstitle}
                </td>
                <td>{competency.competenciestitle}</td>
                <td>
                  {competency.description}
                </td>
                <td>
                  {competency.status}
                </td>
                <td >
                    <Link to={`/edit-competencies/?id=${competency.idCompetencies}`}>
                      <button className={style.myButton}>Edit</button>
                    </Link>
                </td>
              </tr>
            ))
          ) : (
            <>
              <div>No Competencies.</div>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
