const Joi = require('joi');
const fs = require('fs').promises;
const path = require('path');
const fileUpload = require('express-fileupload');


const { database } = require('../infrastructure');


async function createFichero(req, res) {

  
  const {folderId} = req.params;
  const {nombre,nombreCarpeta}=req.query;
  const {imagen } = req.files; 
  
  
  
  console.log(req.query);


  console.log (req.params,req.files);
  try{
     
  const schema = Joi.object({
    nombre: Joi.string()
  });
  await schema.validateAsync({ nombre});
  const selectquery =('SELECT * FROM carpetas WHERE id=?');
  const [rows]= await database.pool.query(selectquery,folderId);
  if (!rows || !rows.length) {
    res.status(404);
    return res.send({ error: 'Carpeta no encontrada' });
    }
    
    if(!req.files || req.files.length === 0) {
      return res.status(400).send('No se ha subido ningun archivo.');
    }
           
     fs.writeFile(path.join(__dirname,`./carpetas_usuarios/${nombreCarpeta}`,imagen.name),imagen.data);
   
   
    
  
    const insertQuery = 'INSERT INTO ficheros (nombre, id_carpetas) VALUES (?,?)';
    const [result]=await database.pool.query(insertQuery,[imagen.name, folderId]);
      
       
  }catch(err){
    res.status(res.code || 500);
    res.send({error: err.message});
    
  }
  }
  async function updateficheros(req, res) {
    try {
      const {folderId} = req.params;
      const {nombre,nombreCarpeta,newNombre}=req.query;
           
      const selectquery ='SELECT * FROM carpetas WHERE id=?';
      const [rows]= await database.pool.query(selectquery,folderId);  
    
      if (!rows || !rows.length) {
        res.status(404);
        return res.send({ error: 'carpeta no encontrada' });
      }
      
   
      
      const updateQuery = 'UPDATE ficheros SET nombre=?  WHERE id = ?';
      await database.pool.query(updateQuery, [newNombre,folderId]);
      fs.rename (`./controllers/carpetas_usuarios/${nombreCarpeta}/${nombre}`,`./controllers/carpetas_usuarios/${nombreCarpeta}/${newNombre}`); 
    } catch (err) {
      res.status(400);
      res.send({ error: err.message });
    }
  }     
      
  module.exports = {
    createFichero,
    updateficheros,

  };