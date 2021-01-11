
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const { database } = require('../infrastructure');

async function getUsers(req, res) {
  try {
    const [users] = await database.pool.query('SELECT * FROM usuarios');
    res.send(users);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
}

async function createUser(req, res) {
  try {



    const { email, password, nombre } = req.body;
    const foto = req.file;
    console.log('>>', req.file)

    const userSchema = Joi.object({

      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
      nombre: Joi.string(),
      //foto: Joi.string(),
    });

    await userSchema.validateAsync({ email, password, nombre });

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [users] = await database.pool.query(query, email);

    if (users.length) {
      const err = new Error('Ya existe un usuario con ese email');
      err.code = 409;
      throw err;
    }
    fs.writeFileSync(path.join(__dirname, "./carpetas_usuarios/" + nombre), foto.buffer);

    const ruta = "http://localhost:3000/static/" + nombre;


    const passwordHash = await bcrypt.hash(password, 10);
    const insertQuery = 'INSERT INTO usuarios ( email, password,nombre,foto) VALUES (?, ?, ?,?)';
    const [rows] = await database.pool.query(insertQuery, [email, passwordHash, nombre, ruta]);


    const createdId = rows.insertId;

    const selectQuery = 'SELECT * FROM usuarios WHERE id = ?';
    const [selectRows] = await database.pool.query(selectQuery, createdId);
    const tokenPayload = { id: createdId };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );


    res.send({ token, ...selectRows[0] });

  } catch (err) {
    res.status(err.httpCode || 500);
    res.send({ error: err.message })
  }
}



async function login(req, res) {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
    });

    await schema.validateAsync({ email, password });



    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [rows] = await database.pool.query(query, email);

    if (!rows || !rows.length) {
      const error = new Error('No existe el usuario');
      error.code = 404;
      throw error;
    }

    const usuario = rows[0];




    const isValidPassword = await bcrypt.compare(password, usuario.password);

    if (!isValidPassword) {
      const error = new Error('El password no es válido');
      error.code = 401;
      throw error;
    }
    const tokenPayload = { id: usuario.id };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );



    res.send({ token, ...rows[0] });




  } catch (err) {
    res.status(err.httpCode || 500);
    res.send({ error: err.message });
  }
}
async function updateUsers(req, res) {
  try {
    const userId = req.auth.id;
    const { nombre, email } = req.body;
    const foto = req.file;

    const selectquery = 'SELECT * FROM usuarios WHERE id=?';
    const [rows] = await database.pool.query(selectquery, userId);

    if (!rows || !rows.length) {
      res.status(404);
      return res.send({ error: 'usuario no encontrado' });
    }


    console.log('Update:', userId, nombre, email,foto) 
    const nombrefoto="http://localhost:3000/static/"+nombre;
    const updateQuery = 'UPDATE usuarios SET nombre=?, email=?, foto=? WHERE id = ?';
    await database.pool.query(updateQuery, [nombre, email, nombrefoto, userId]);
    console.log('Rename:', rows[0].nombre, nombre)
    fs.renameSync(path.join(__dirname, `./carpetas_usuarios/${rows[0].nombre}`), path.join(__dirname, `./carpetas_usuarios/${nombre}`));
    //fs.renameSync(`./carpetas_usuarios/${rows[0].nombre}`, `./carpetas_usuarios/${nombre}`);
    fs.writeFileSync(path.join(__dirname, "./carpetas_usuarios/" + nombre), foto.buffer);
  } catch (err) {
    console.error(err)
    res.status(400);
    res.send({ error: err.message });
  }
}

module.exports = {
  createUser,
  getUsers,
  login,
  updateUsers,

};