 const authService = require("../../../services/authService")

 module.exports = {
    register(req, res) {
        authService
          .register(req.body)
            .then((user) => {
                res.status(201).json({
                    status: "OK",
                    data: user,
                });
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
     },
     login(req, res) {
        authService
          .login(req.body)
            .then((user) => {
                console.log(user)
                res.status(201).json({
                    status: "OK",
                    data: user,
                });
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
     },
 };