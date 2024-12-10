const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { validateAlumno } = require('../middlewares/validations'); 

// **GET**: Obtener todos los alumnos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM alumnos');
        res.json(rows); 
    } catch (err) {
        console.error('Error al obtener alumnos:', err);
        res.status(500).json({ error: 'Error al obtener alumnos' });
    }
});


router.post('/', validateAlumno, async (req, res) => {
    const { nombre, matricula } = req.body; 

    try {
        const [result] = await db.query(
            'INSERT INTO alumnos (nombre, matricula) VALUES (?, ?)', 
            [nombre, matricula]
        );
        res.status(201).json({ 
            id: result.insertId, 
            nombre, 
            matricula 
        });
    } catch (err) {
        console.error('Error al crear alumno:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'La matrícula ya existe' });
        } else {
            res.status(500).json({ error: 'Error al crear alumno' });
        }
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params; 

    try {
        const [result] = await db.query('DELETE FROM alumnos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.json({ message: 'Alumno eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar alumno:', err);
        res.status(500).json({ error: 'Error al eliminar alumno' });
    }
});


router.put('/:id', validateAlumno, async (req, res) => {
    const { id } = req.params; 
    const { nombre, matricula } = req.body; 

    try {
        const [result] = await db.query(
            'UPDATE alumnos SET nombre = ?, matricula = ? WHERE id = ?', 
            [nombre, matricula, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.json({ message: 'Alumno actualizado correctamente' });
    } catch (err) {
        console.error('Error al actualizar alumno:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'La matrícula ya existe' });
        } else {
            res.status(500).json({ error: 'Error al actualizar alumno' });
        }
    }
});

module.exports = router;
