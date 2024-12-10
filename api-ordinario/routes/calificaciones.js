const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { validateCalificacion } = require('../middlewares/validations');

// Obtener todas las calificaciones
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM calificaciones');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener calificaciones' });
    }
});

// Crear una nueva calificación
router.post('/', validateCalificacion, async (req, res) => {
    const { alumno_id, asignatura_id, calificacion } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO calificaciones (alumno_id, asignatura_id, calificacion) VALUES (?, ?, ?)',
            [alumno_id, asignatura_id, calificacion]
        );
        res.status(201).json({ id: result.insertId, alumno_id, asignatura_id, calificacion });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear calificación' });
    }
});

module.exports = router;
