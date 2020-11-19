const Joi = require('joi');
const fs = require('fs').promises;
const path = require('path');
const { database } = require('../infrastructure');
async function createFolder(req, res) {
  try{
  const {userId} =  req.params;
  const {nombre} = req.body;
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

  
  
  const insertQuery = 'INSERT INTO carpetas (nombre, id_usuarios) VALUES (?, ?)';
  const [result]=await database.pool.query(insertQuery,[nombre, userId]);
  

  
    
  
    
 function createDirectory() {
    
    const ruta = path.join(__dirname,`./carpetas_usuarios/${nombre}`);
     fs.mkdir(ruta);
    
    
  }
createDirectory();



 
  res.status(201);
  res.send(result[0]);
  
}catch(err){
  res.status(res.code || 500);
  res.send({error: err.message});
}
}

async function getFolders(req, res) {
  try {
    const [carpetas] = await database.pool.query('SELECT * FROM carpetas');
    res.send(carpetas);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
}

module.exports = {
  getFolders,
  createFolder,
};
