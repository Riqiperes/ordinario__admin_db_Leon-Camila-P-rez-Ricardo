const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { validateAsignatura } = require('../middlewares/validations');

// Obtener todas las asignaturas
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM asignaturas');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener asignaturas' });
    }
});

// Crear una nueva asignatura
router.post('/', validateAsignatura, async (req, res) => {
    const { nombre, profesor_id } = req.body;

    try {
        const [result] = await db.query('INSERT INTO asignaturas (nombre, profesor_id) VALUES (?, ?)', [nombre, profesor_id]);
        res.status(201).json({ id: result.insertId, nombre, profesor_id });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear asignatura' });
    }
});

module.exports = router;
