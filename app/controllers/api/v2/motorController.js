 const motorService = require("../../../services/motorService");

 module.exports = {
   list(req, res) {
     motorService
       .list()
       .then(({ data, count }) => {
         res.status(200).json({
           status: "OK",
           data: { motors: data },
           meta: { total: count },
         });
       })
       .catch((err) => {
         res.status(400).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 
   create(req, res) {
     motorService
       .create(req.body)
       .then((motor) => {
         res.status(201).json({
           status: "OK",
           data: motor,
         });
       })
       .catch((err) => {
         res.status(422).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 
   update(req, res) {
     motorService
       .update(req.params.id, req.body)
       .then(() => {
         res.status(200).json({
           status: "OK",
         });
       })
       .catch((err) => {
         res.status(422).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 
   show(req, res) {
     motorService
       .get(req.params.id)
       .then((motor) => {
         res.status(200).json({
           status: "OK",
           data: motor,
         });
       })
       .catch((err) => {
         res.status(422).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 
   destroy(req, res) {
     motorService
       .delete(req.params.id)
       .then(() => {
         res.status(204).end();
       })
       .catch((err) => {
         res.status(422).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 };
 