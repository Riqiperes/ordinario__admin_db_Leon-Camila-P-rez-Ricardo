const express = require('express');

const router = express.Router();

const db = require('../db');


// GET: Obtener todas las asignaturas

router.get('/', async (req, res) => {

    try {

        const [rows] = await db.query('SELECT * FROM asignaturas');

        res.json(rows);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});


// POST: Crear una nueva asignatura

router.post('/', async (req, res) => {

    const { nombre, profesor_id } = req.body;


    if (!nombre || !profesor_id) {

        return res.status(400).json({ error: 'Faltan datos' });

    }


    try {

        await db.query(

            'INSERT INTO asignaturas (nombre, profesor_id) VALUES (?, ?)',

            [nombre, profesor_id]

        );

        res.status(201).json({ message: 'Asignatura creada' });

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});


module.exports = router;

