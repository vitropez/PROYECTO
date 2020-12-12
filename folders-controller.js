const Joi = require('joi');
const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const app = express();


const { database } = require('../infrastructure');

async function createFolder(req, res) {
  try{
  const { userId } = req.params;
  if (Number(userId) !== req.auth.id) {
      const err = new Error('El usuario no tiene permisos');
      err.code = 403;
      throw err;
    }
  
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
  
  const insertQuery = 'INSERT INTO carpetas (nombre, id_usuarios,id_carpetas,ruta) VALUES (?,?,?,?)';
  const [result]=await database.pool.query(insertQuery,[nombre, userId,carpetasId,ruta]);
    
  
  res.status(201);
  res.send(result[0]);
  
}catch(err){
  res.status(res.code || 500);
  res.send({error: err.message});
}
}

async function getFoldersByUserId(req, res) {
 
  try {
    /*
    const { userId } = req.params;
    
    if (Number(userId) !== req.auth.id) {
      const err = new Error('El usuario no tiene permisos');
      err.code = 403;
      throw err;
    }

    */
    const userId = req.auth.id;
    const query = 'SELECT * FROM carpetas WHERE id_usuarios= ?';
    const [carpetas] = await database.pool.query(query, userId);
    res.send(carpetas);

  } catch (err) {
    console.log('>>', err.code)
    res.status(err.code || 500);
    res.send({ error: err.message });
  }
}



async function updateFolder(req, res) {
  try {
    
    const {folderId} = req.params;
   
    const {nombre,newNombre} = req.body;
    const selectquery ='SELECT * FROM carpetas WHERE id=?';
    const [folders]= await database.pool.query(selectquery,folderId);  
  
    if (!folders || !folders.length) {
      res.status(404);
      return res.send({ error: 'Carpeta no encontrada' });
    }
    const folder = rows[0];

    if (folder.user_id !== req.auth.id) {
      const err = new Error('El usuario no tiene permisos');
      err.code = 403;
      throw err;
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
  getFoldersByUserId,
  createFolder,
  updateFolder,
};

