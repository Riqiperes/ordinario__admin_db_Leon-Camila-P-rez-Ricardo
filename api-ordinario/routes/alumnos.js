const express = require('express');

const router = express.Router();

const db = require('../db');


// GET: Obtener todos los alumnos

router.get('/', async (req, res) => {

    try {

        const [rows] = await db.query('SELECT * FROM alumnos');

        res.json(rows);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});


// POST: Crear un nuevo alumno

router.post('/', async (req, res) => {

    const { nombre, apellidos, email, matricula, edad, semestre } = req.body;


    if (!nombre || !apellidos || !email || !matricula || !edad || !semestre) {

        return res.status(400).json({ error: 'Faltan datos' });

    }


    try {

        await db.query(

            'INSERT INTO alumnos (nombre, apellidos, email, matricula, edad, semestre) VALUES (?, ?, ?, ?, ?, ?)',

            [nombre, apellidos, email, matricula, edad, semestre]

        );

        res.status(201).json({ message: 'Alumno creado' });

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});


module.exports = router;

