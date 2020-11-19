const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    const { nombre, email, contrasena,nick,direccion,apellidos,foto,telefono } = req.body;

    const userSchema = Joi.object({
      nombre: Joi.string(),
      email: Joi.string().email().required(),
      contrasena: Joi.string().min(6).max(20).required(),
      nick: Joi.string(),
      apellidos: Joi.string(),
      direccion:Joi.string(),
      telefono:Joi.number(),
      foto:Joi.string(),
    });

    await userSchema.validateAsync({ nombre, email, contrasena,nick,apellidos,direccion,telefono,foto });

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [users] = await database.pool.query(query, email);

    if (users.length) {
      const err = new Error('Ya existe un usuario con ese email');
      err.code = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(contrasena, 10);
    const insertQuery = 'INSERT INTO usuarios (nombre, email, contrasena,nick,apellidos,direccion,telefono,foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const [rows] = await database.pool.query(insertQuery, [nombre, email, passwordHash,nick,direccion,apellidos,telefono,foto]);

    const createdId = rows.insertId;

    const selectQuery = 'SELECT * FROM usuarios WHERE id = ?';
    const [selectRows] = await database.pool.query(selectQuery, createdId);

    res.send(selectRows[0]);

  } catch (err) {
    res.status(err.code || 500);
    res.send({ error: err.message })
  }
}

async function login(req, res) {
  try {
    const { email, contrasena }= req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      contrasena: Joi.string().min(6).max(20).required(),
    });

    await schema.validateAsync({ email, contrasena });

    

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [rows] = await database.pool.query(query, email);

    if (!rows || !rows.length) {
      const error = new Error('No existe el usuario');
      error.code = 404;
      throw error;
    }

    const usuario = rows[0];

    

    const isValidPassword = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!isValidPassword) {
      const error = new Error('El password no es válido');
      error.code = 401;
      throw error;
    }

    

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    
    res.send({ token });

  } catch (err) {
    res.status(err.code || 500);
    res.send({ error: err.message });
  }
}

module.exports = {
  createUser,
  getUsers,
  login,
};
