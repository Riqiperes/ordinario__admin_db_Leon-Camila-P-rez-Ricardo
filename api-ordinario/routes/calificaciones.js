const express = require('express');

const router = express.Router();

const db = require('../db');


// GET: Obtener todas las calificaciones

router.get('/', async (req, res) => {

    try {

        const [rows] = await db.query('SELECT * FROM calificaciones');

        res.json(rows);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});


// POST: Crear una nueva calificación

router.post('/', async (req, res) => {

    const { estudiante_id, maestro_id, materia_id, calificacion } = req.body;


    if (!estudiante_id || !maestro_id || !materia_id || calificacion === undefined) {

        return res.status(400).json({ error: 'Faltan datos' });

    }


    try {

        await db.query(

            'INSERT INTO calificaciones (estudiante_id, maestro_id, materia_id, calificacion) VALUES (?, ?, ?, ?)',

            [estudiante_id, maestro_id, materia_id, calificacion]

        );

        res.status(201).json({ message: 'Calificación creada' });

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});


module.exports = router;

