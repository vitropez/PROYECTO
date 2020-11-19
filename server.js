require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');



const {
  foldersController,
  UsersController,
} = require('./controllers');
const ficherosControllers = require('./controllers/ficheros-controllers');

const { HTTP_PORT } = process.env;

const app = express();

app.use(bodyParser.json());

// Endpoints / Rutas
app.get('/api/folders', foldersController.getFolders);
app.get('/api/users', UsersController.getUsers);
app.post('/api/users', UsersController.createUser);
app.post('/api/users/login', UsersController.login);
app.post('/api/folders/:userId',foldersController.createFolder);
app.post('/api/ficheros/:folderId',ficherosControllers.createFichero);

// Escuchar un puerto
app.listen(HTTP_PORT, () => console.log(`Escuchando en el puerto ${HTTP_PORT}`));