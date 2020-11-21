const Joi = require('joi');
const fs = require('fs').promises;
const path = require('path');
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
 
  
  const insertQuery = 'INSERT INTO carpetas (nombre, id_usuarios,id_carpetas) VALUES (?, ?,?)';
  const [result]=await database.pool.query(insertQuery,[nombre, userId,carpetasId]);

 
 
    
    const ruta = path.join(__dirname,`./carpetas_usuarios/${nombre}`);
     fs.mkdir(ruta);
    
    
 
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


async function updateFolder(req, res) {
  try {
    
    const {id } = req.params;
    let schema = Joi.number().positive().required();
    await schema.validateAsync(id);

    const {nombre} = req.body;
  
    schema = Joi.object({
      nombre: Joi.string().required(),
      
    });

    await schema.validateAsync({nombre});
    

    
    const query = 'SELECT * FROM carpetas WHERE id = ?';
    const [rows] = await database.pool.query(query,id);

    if (!rows || !rows.length) {
      res.status(404);
      return res.send({ error: 'Carpeta no encontrada' });
    }
    
    const updateQuery = 'UPDATE carpetas SET nombre = ?  WHERE id = ?';
    await database.pool.query(updateQuery, [nombre,id]);
  
  
    
      
  
    
    
    const selectQuery = 'SELECT * FROM carpetas WHERE id = ?';
    const [selectRows] = await database.pool.query(selectQuery,id);

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

