const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
    
  const review_id = req.body.review_id;
  console.log(req.body);
  db.query("SELECT domains_id, COUNT(*) AS standard_count FROM evidencereviews WHERE idevidencereview = ? GROUP BY domains_id",
  [review_id],
  (err, result) => {
    ///add in another DB QUERY FOR GETTING NUMBER OF DIFFERENT STANDARDS
  const response = result;
  // console.log(response[]);
  console.log(response.length);
  console.log(response.standard_count);
  db.query(
    "SELECT * FROM evidencereviews WHERE idevidencereview = ?",
    [review_id],
    (err, result) => {
      console.log(result[1]);
      console.log(result.length);
      
      var obj = [];
      var doneDomains = [];
      var doneStandards = [];
      var domainCount = 0;
      var prevdomainCount = 0;
      var standCount = 0;
      var prevstandCount = 0;
            for (let i = 0; i < result.length; i++) {
              if (doneDomains.includes(result[i].domains_id) === false){
                obj.push({"domains_id":result[i].domains_id, "standards": []});
                console.log(obj);
                obj[domainCount]["standards"] = [];
                prevdomainCount = domainCount;
                domainCount += 1;
                //obj[result[i].domains_id]["standards"] = [];
                doneDomains.push(result[i].domains_id);
                console.log("Added Domain");
              }
              
              if (doneStandards.includes(result[i].standards_id) === false){
                // obj[result[i].domains_id]["standards"].push({"standards_id": result[i].standards_id,"competencies": []});
                obj[prevdomainCount]["standards"].push({"standards_id": result[i].standards_id,"competencies": []});
                // obj[result[i].domains_id]["standards"][standCount]["competencies"] = [];
                obj[prevdomainCount]["standards"][standCount]["competencies"] = [];
                prevstandCount = standCount;
                standCount += 1;
                doneStandards.push(result[i].standards_id);
                console.log("Added Standard");
              } 
              var point = {};
              point = {"competencies_id": result[i].competencies_id, "performancecriterias_id": result[i].performancecriterias_id, "comments": result[i].comments, "review_id": result[i].review_id};
              // obj[result[i].domains_id]["standards"][prevstandCount]["competencies"].push(point);
              obj[prevdomainCount]["standards"][prevstandCount]["competencies"].push(point);

              console.log("Looped");
            }


              
              // for(let i = 0; i < 1; i++){ //change to the count of all unique domains .e.g. will create 2 objects if there is 2 unique domaiuns
              //   obj[result[i].domains_id]={"domain_id":result[i].domains_id, "standards": []}; //wont work with multiple ones so will have to update
              //   obj[result[i].domains_id]["standards"] = [];
              //   for(let j = 0; j < 1; j++){ //change to the count of all unique standards
              //     obj[result[i].domains_id]["standards"].push({"standards_id": result[i].standards_id,"competencies": []});
              //     //console.log(obj[result[i].domains_id]["standards"][0]); 
              //     obj[result[i].domains_id]["standards"][j]["competencies"] = [];
              //     //console.log("above is stadnadad");
              //     for(let k = 0; k < 2; k++){ //change to the count of all items with the same standard and domain
              //       var point = {};
              //       point = {"competencies_id": result[i].competencies_id, "performancecriterias_id": result[i].performancecriterias_id, "comments": result[i].comments};
              //       obj[result[i].domains_id]["standards"][j]["competencies"].push(point);
              //     }
              //   }





                //have to go in as each loop is setting the value to an empty array!!!!!!!!!!!!!!!!!!!
                // obj[result[i].domains_id]["standards"] = ({"standards_id": result[i].standards_id,"competencies": {}});
     //           var point = {};
       //         point = {"competencies_id": result[i].competencies_id,
         //        "performancecriterias_id": result[i].performancecriterias_id, "comments": result[i].comments};
                 
     //           obj[result[i].domains_id]["standards"]["competencies"] = [];
       //         console.log('Aahhahahaha'); 
         //       console.log(obj[result[i].domains_id]["standards"]["competencies"]);

                // point = ({"competencies_id": result[i].competencies_id,
                // "performancecriterias_id": result[i].performancecriterias_id, "comments": result[i].comments});

                //console.log("point");
                //console.log(point);

                //obj[result[i].domains_id]["standards"]["competencies"].push(point);

              //   console.log('All Competencies Just pushed'); 
              //   console.log(obj[result[i].domains_id]["standards"]["competencies"]);
              //   console.log("The object");
              // console.log(obj);
              // point = null;
              // }
            
              console.log("The object");
              console.log(obj);
              console.log("All competencies in the object");
              console.log(obj[0]["standards"][0]["competencies"]);
              console.log("---------------------");
              // console.log("Competencies first value object");
              // console.log(obj[1]["standards"]["competencies"]);
              console.log("RESULT");
        console.log(result);
        console.log("RTURNED OBJECT");
        console.log(obj);
        res.send({data: obj});
   //////////     res.send({data: result}); ///////////////////////////////////////////////////////
        //////////////////////////////////////////
        ///////////////////////////////////
    }
  );}
)});

module.exports = router;

// router.post("/", function (req, res, next) {
//   const idEvidenceReview = req.body.id_evidence_review;
//   db.query("select domains_id, count(*) from evidencereviews WHERE idevidencereview = ? group by domains_id;"),
//   [idEvidenceReview],
//   (err, result) => {
//   const response = { result};
//   console.log(result);
  
//   db.query(
//     "SELECT * FROM evidencereviews WHERE idevidencereview = ?;",
//     [idEvidenceReview],
//     (err, result) => {
//       if (err) {
//         res.send(500);
//       } else {
//         // var obj = {};
//         // for(let i = 0; i < result.length; i++){
//         //   obj["domain_id"]=result[i].domains_id;
//         //   for(let i = 0; i < result.length; i++){

//         //   }
//         // }
//         // console.log(obj);
//         res.send(result);
//       }
//     }
//   );}
// });

// module.exports = router;
