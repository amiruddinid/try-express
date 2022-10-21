const express = require("express");
const path = require("path")
const swaggerUi = require('swagger-ui-express');
const controllers = require("../app/controllers");
const swaggerDocument = require('../swagger.json');
const apiRouter = express.Router();

const publicDir = path.join(process.cwd(), "public")

apiRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//endpoint static
apiRouter.use('/', express.static('public')); //serve index.html
apiRouter.use('/add', express.static(publicDir + '/add.html')); //serve index.html
apiRouter.use('/update/:id', express.static(publicDir + '/update.html'))
apiRouter.use('/bootstrap', express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))) //serve bootstrap

//endpoint Uploads
apiRouter.use('/api/uploads', controllers.api.upload.onUpload) 

//endpoint API sql (query)
apiRouter.get('/api/v1/motors',  controllers.api.v1.motorController.handleGetMotors); // get Motors (ambil semua data motor)
apiRouter.get('/api/v1/motors/:id', controllers.api.v1.motorController.handleGetMotor); // get motor/:id (ambil data motor by id)
apiRouter.post('/api/v1/motors', controllers.api.v1.motorController.handleCreateMotor); // post motor (menambahkan data motor)
apiRouter.put('/api/v1/motors/:id', controllers.api.v1.motorController.handleUpdateMotor); // put motor/:id (mengedit data motor by id)
apiRouter.delete('/api/v1/motors/:id', controllers.api.v1.motorController.handleDeleteMotor); // delete motor/:id (delete data motor by id)

//endpoint API sequelize
apiRouter.get('/api/v2/motors',  controllers.api.v2.motorController.list); // get Motors (ambil semua data motor)
apiRouter.get('/api/v2/motors/:id', controllers.api.v2.motorController.show); // get motor/:id (ambil data motor by id)
apiRouter.post('/api/v2/motors', controllers.api.v2.motorController.create); // post motor (menambahkan data motor)
apiRouter.put('/api/v2/motors/:id', controllers.api.v2.motorController.update); // put motor/:id (mengedit data motor by id)
apiRouter.delete('/api/v2/motors/:id', controllers.api.v2.motorController.destroy); // delete motor/:id (delete data motor by id)

apiRouter.post('/api/v2/register', controllers.api.v2.authController.register);
apiRouter.post('/api/v2/login', controllers.api.v2.authController.login);

apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
