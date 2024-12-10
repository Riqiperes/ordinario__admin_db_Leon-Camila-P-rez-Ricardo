const express = require('express');

const router = express.Router();

const db = require('../db');


// GET: Obtener todos los profesores

router.get('/', async (req, res) => {

    try {

        const [rows] = await db.query('SELECT * FROM profesores');

        res.json(rows);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});


// POST: Crear un nuevo profesor

router.post('/', async (req, res) => {

    const { nombre, edad, telefono, correo } = req.body;


    if (!nombre || !edad || !telefono || !correo) {

        return res.status(400).json({ error: 'Faltan datos' });

    }


    try {

        await db.query(

            'INSERT INTO profesores (nombre, edad, telefono, correo) VALUES (?, ?, ?, ?)',

            [nombre, edad, telefono, correo]

        );

        res.status(201).json({ message: 'Profesor creado' });

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});


module.exports = router;

