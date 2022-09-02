const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const resolve = require("resolve");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  async function selectDomains() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM domains WHERE status = 'Active';",
        (err, result) => {
          if (err) {
            throw err;
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  async function selectStandards(domainId) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM standards WHERE domains_id = ? AND status = 'Active';",
        [domainId],
        (err, result) => {
          if (err) {
            throw err;
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  async function selectCompetencies(standardsId) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM competencies WHERE standards_id = ? AND status = 'Active';",
        [standardsId],
        (err, result) => {
          if (err) {
            throw err;
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  async function selectPerformanceCriteria() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM performancecriterias WHERE status = 'Active';",
        (err, result) => {
          if (err) {
            throw err;
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  async function domainData() {
    const domains = await selectDomains();
    for (let i = 0; i < domains.length; i++) {
      const standards = await selectStandards(domains[i].iddomains);
      domains[i]["standards"] = standards;
      for (let j = 0; j < domains[i].standards.length; j++) {
        const competencies = await selectCompetencies(
          domains[i].standards[j].idstandards
        );
        domains[i].standards[j]["competencies"] = competencies;
      }
    }
    const performanceCriteria = await selectPerformanceCriteria();

    res.send({
      domains: domains,
      performance_criteria: performanceCriteria,
    });
  }

  domainData();
});

module.exports = router;
