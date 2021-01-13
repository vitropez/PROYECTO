const Joi = require('joi');
const fs = require('fs').promises;
const path = require('path');
const fileUpload = require('express-fileupload');


const { database } = require('../infrastructure');
async function getFicherosById(req, res) {

  try {
    const { id } = req.params;

    /*if (Number(userId) !== req.auth.id) {
      const err = new Error('El usuario no tiene permisos');
      err.code = 403;
      throw err;
    }

    */

    const query = 'SELECT * FROM ficheros WHERE id_carpetas=?';
    const [ficheros] = await database.pool.query(query, id);
    res.send(ficheros);

  } catch (err) {

    res.status(err.code || 500);
    console.log(err)
    res.send({ error: err.message });
   
  }
}


async function createFichero(req, res) {

  const {carpeta, nombre } = req.body;
  const imagen = req.file;


  try {

    const schema = Joi.object({
      nombre: Joi.string()
    });
    await schema.validateAsync({ nombre });
    const selectquery = 'SELECT * FROM carpetas WHERE id=?';
    const [rows] = await database.pool.query(selectquery, [carpeta]);
    if (!rows || !rows.length) {
      res.status(404);
      return res.send({ error: 'Carpeta no encontrada' });
    }
    const nombre_carpeta = rows[0].nombre

    if (!req.file || req.file.length === 0) {
      return res.status(400).send('No se ha subido ningun archivo.');
    }

    const ext = imagen.originalname.split('.').pop()
    fs.writeFile(path.join(__dirname, `./carpetas_usuarios/${nombre_carpeta}`, nombre + '.' + ext), imagen.buffer);
    const ruta = `http://localhost:3000/static/${nombre_carpeta}/${nombre}.${ext}`;



    const insertQuery = 'INSERT INTO ficheros (nombre, id_carpetas, ruta) VALUES (?,?,?)';
    const [result] = await database.pool.query(insertQuery, [nombre, carpeta, ruta]);

    res.send(result);

  } catch (err) {
    console.log(err)
    res.status(res.code || 500);
    res.send({ error: err.message });

  }
}
async function updateficheros(req, res) {
  try {
    const { folderId } = req.params;
    const { nombre, nombreCarpeta, newNombre } = req.query;

    const selectquery = 'SELECT * FROM carpetas WHERE id=?';
    const [rows] = await database.pool.query(selectquery, folderId);

    if (!rows || !rows.length) {
      res.status(404);
      return res.send({ error: 'carpeta no encontrada' });
    }



    const updateQuery = 'UPDATE ficheros SET nombre=?  WHERE id = ?';
    await database.pool.query(updateQuery, [newNombre, folderId]);
    fs.rename(`./controllers/carpetas_usuarios/${nombreCarpeta}/${nombre}`, `./controllers/carpetas_usuarios/${nombreCarpeta}/${newNombre}`);
  } catch (err) {
    res.status(400);
    res.send({ error: err.message });
  }
}
async function deletefichero(req, res) {
  try {
    const { id } = req.params;
    const [ficheros] = await database.pool.query('SELECT * FROM ficheros WHERE id = ?', id);

    if (!ficheros.length) {
      res.status(404);
      return res.send({ error: 'fichero no encontrado' });
    }

    await database.pool.query('DELETE FROM ficheros WHERE id = ?', id);

    res.status(200);
    res.send({});
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
}


module.exports = {
  getFicherosById,
  createFichero,
  updateficheros,
  deletefichero

};