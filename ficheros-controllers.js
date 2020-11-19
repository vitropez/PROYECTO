const Joi = require('joi');
const fs = require('fs').promises;
const path = require('path');

const { database } = require('../infrastructure');


async function createFichero(req, res) {
  try{
  const {folderId} =  req.params;
  const {nombre,nombreCarpeta,data} = req.body;
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
    const insertQuery = 'INSERT INTO ficheros (nombre, id_carpetas) VALUES (?, ?)';
    const [result]=await database.pool.query(insertQuery,[nombre, folderId]);
    function escribeFichero(){

      const ruta = path.join(__dirname,`./carpetas_usuarios/${nombreCarpeta}/${nombre}`);
      const datos = data

      fs.writeFile(ruta,datos)

      
    }
    escribeFichero();
   
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