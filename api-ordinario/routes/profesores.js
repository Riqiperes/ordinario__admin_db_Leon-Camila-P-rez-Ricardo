const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { validateProfesor } = require('../middlewares/validations');

// Obtener todos los profesores
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM profesores');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener profesores' });
    }
});

// Crear un nuevo profesor
router.post('/', validateProfesor, async (req, res) => {
    const { nombre, especialidad } = req.body;

    try {
        const [result] = await db.query('INSERT INTO profesores (nombre, especialidad) VALUES (?, ?)', [nombre, especialidad]);
        res.status(201).json({ id: result.insertId, nombre, especialidad });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear profesor' });
    }
});

module.exports = router;
