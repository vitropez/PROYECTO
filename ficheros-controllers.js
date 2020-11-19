const Joi = require('joi');
const fs = require('fs').promises;
const path = require('path');
const fileUpload = require('express-fileupload');


const { database } = require('../infrastructure');


async function createFichero(req, res) {
  try{
  
  const {folderId,nombre,nombreCarpeta} = req.params;
  let imagen = req.files.imagen;
 
  
  const schema = Joi.object({
    nombre: Joi.string()
  });
  await schema.validateAsync({ nombre });
  const selectquery =('SELECT * FROM carpetas WHERE id=?');
  const [rows]= await database.pool.query(selectquery,folderId);
  if (!rows || !rows.length) {
    res.status(404);
    return res.send({ error: 'Carpeta no encontrada' });
    }
    
    if(!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No se ha subido ningun archivo.');
    }
    
  
    imagen.mv(`/carpetas_usuarios/${nombreCarpeta}/${nombre}`, function(err) {
      
    });
    createFichero();
  
    const insertQuery = 'INSERT INTO ficheros (nombre, id_carpetas) VALUES (?,?)';
    const [result]=await database.pool.query(insertQuery,[nombre, folderId]);
   
   
    res.status(201);
    res.send(result[0]);
    
  }catch(err){
    res.status(res.code || 500);
    res.send({error: err.message});
    
  }
  }
  module.exports = {
    createFichero,
  };
