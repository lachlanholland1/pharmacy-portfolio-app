import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./DomainsTableStyle.css";
import { confirmAlert } from "react-confirm-alert";

export default function DomainsTable(props) {
  const params = useParams();
  const { auth } = useAuth();
  const [domainData, setdomainData] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div>
      <h2>Domains</h2>
      {domainData.length ? (
        <table className={style.table}>
          <tr table className={style.tr}>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tbody>
            {domainData.map((domain) => (
              <tr table className={style.tr1}>
                <td>{domain.title}</td>
                <td>{domain.description}</td>
                <td>{domain.status}</td>
                <td>
                  <Link to={`/edit-domains/?id=${domain.iddomains}`}>
                    <button className={style.myButton}>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <div>No domains.</div>
        </>
      )}
    </div>
  );
}
