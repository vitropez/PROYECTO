const Joi = require('joi');
const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const app = express();
import {login} from './users-controller.js';


const { database } = require('../infrastructure');
async function createFolder(req, res) {
  try{
  const {userId} =  req.params;
  const {nombre,carpetasId} = req.body;
  const schema = Joi.object({
    
    nombre: Joi.string()
  });
  await schema.validateAsync({ nombre });
  const selectquery =('SELECT * FROM usuarios WHERE id=?');
  const [rows]= await database.pool.query(selectquery,userId);
  if (!rows || !rows.length) {
    res.status(404);
    return res.send({ error: 'Usuario no encontrado' });
    }
   
    const ruta = path.join(__dirname,`./carpetas_usuarios/${nombre}`);
     fs.mkdir(ruta);
  
  const insertQuery = 'INSERT INTO carpetas (nombre, id_usuarios,id_carpetas,ruta) VALUES (?, ?,?,?)';
  const [result]=await database.pool.query(insertQuery,[nombre, userId,carpetasId,ruta]);

 
 
   
    
    
 
  res.status(201);
  res.send(result[0]);
  
}catch(err){
  res.status(res.code || 500);
  res.send({error: err.message});
}
}

async function getFolders(req, res) {
  app.use(login(request, response, next),{
    
 
  });

  try {
    const {folderId} = req.params;
    
    const [carpetas] = await database.pool.query('SELECT * FROM carpetas  WHERE id_carpetas=?',folderId);
    res.send(carpetas);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
}


async function updateFolder(req, res) {
  try {
    
    const {folderId} = req.params;
   
    const {nombre,newNombre} = req.body;
    const selectquery ='SELECT * FROM carpetas WHERE id=?';
    const [rows]= await database.pool.query(selectquery,folderId);  
  
    if (!rows || !rows.length) {
      res.status(404);
      return res.send({ error: 'Carpeta no encontrada' });
    }
    
 
    
    const updateQuery = 'UPDATE carpetas SET nombre=?  WHERE id = ?';
    await database.pool.query(updateQuery, [newNombre,folderId]);
    fs.rename (`./controllers/carpetas_usuarios/${nombre}`,`./controllers/carpetas_usuarios/${newNombre}`); 
    const newruta = path.join(__dirname,`./carpetas_usuarios/${newNombre}`);
    const newQuery = 'UPDATE carpetas SET ruta=?  WHERE id = ?';
    await database.pool.query(newQuery, [newruta,folderId]);
       
    const selectQuery = 'SELECT * FROM carpetas WHERE id = ?';
    const [selectRows] = await database.pool.query(selectQuery,folderId);


    res.send(selectRows[0]);
  } catch (err) {
    res.status(400);
    res.send({ error: err.message });
  }
}
module.exports = {
  getFolders,
  createFolder,
  updateFolder,
};

