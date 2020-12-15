require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors =require ('cors');
var multer  = require('multer')
var upload = multer()


const {
  foldersController,
  UsersController,
} = require('./controllers');
const ficherosControllers = require('./controllers/ficheros-controllers');
const { validateAuthorization } = require('./middlewares');

const { HTTP_PORT } = process.env;

const app = express();
//app.use(fileUpload());
app.use(bodyParser.json());
app.use(cors());
app.use('/static', express.static(__dirname + '/controllers/carpetas_usuarios'));


// Endpoints / Rutas
app.get('/api/ficheros/:foldersId',ficherosControllers.getFicherosById)
app.get('/api/folders',validateAuthorization, foldersController. getFoldersByUserId);
app.get('/api/users', UsersController.getUsers);
app.post('/api/users',upload.single('foto'), UsersController.createUser);
app.post('/api/users/login', UsersController.login);
app.post('/api/folders/:userId',validateAuthorization,foldersController.createFolder);
app.post('/api/ficheros',ficherosControllers.createFichero);
app.put('/api/folders/:folderId',validateAuthorization,foldersController.updateFolder);
app.put('/api/ficheros/:folderId',ficherosControllers.updateficheros);
app.delete('api/ficheros/:id', ficherosControllers.deletefichero);
app.put('/api/users',validateAuthorization,UsersController.updateUsers);

// Escuchar un puerto
app.listen(HTTP_PORT, () => console.log(`Escuchando en el puerto ${HTTP_PORT}`));
