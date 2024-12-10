// Validación para `alumnos`
const validateAlumno = (req, res, next) => {
    const { nombre, matricula } = req.body;

    if (!nombre || typeof nombre !== 'string') {
        return res.status(400).json({ error: 'El nombre es obligatorio y debe ser una cadena.' });
    }

    if (!matricula || typeof matricula !== 'string') {
        return res.status(400).json({ error: 'La matrícula es obligatoria y debe ser una cadena.' });
    }

    next();
};


const validateProfesor = (req, res, next) => {
    const { nombre, especialidad } = req.body;

    if (!nombre || typeof nombre !== 'string') {
        return res.status(400).json({ error: 'El nombre es obligatorio y debe ser una cadena.' });
    }

    if (!especialidad || typeof especialidad !== 'string') {
        return res.status(400).json({ error: 'La especialidad es obligatoria y debe ser una cadena.' });
    }

    next();
};


const validateAsignatura = (req, res, next) => {
    const { nombre, profesor_id } = req.body;

    if (!nombre || typeof nombre !== 'string') {
        return res.status(400).json({ error: 'El nombre de la asignatura es obligatorio y debe ser una cadena.' });
    }

    if (profesor_id !== undefined && (typeof profesor_id !== 'number' || profesor_id <= 0)) {
        return res.status(400).json({ error: 'El ID del profesor debe ser un número positivo.' });
    }

    next();
};


const validateCalificacion = (req, res, next) => {
    const { alumno_id, asignatura_id, calificacion } = req.body;

    if (!alumno_id || typeof alumno_id !== 'number' || alumno_id <= 0) {
        return res.status(400).json({ error: 'El ID del alumno es obligatorio y debe ser un número positivo.' });
    }

    if (!asignatura_id || typeof asignatura_id !== 'number' || asignatura_id <= 0) {
        return res.status(400).json({ error: 'El ID de la asignatura es obligatorio y debe ser un número positivo.' });
    }

    if (calificacion === undefined || typeof calificacion !== 'number' || calificacion < 0 || calificacion > 100) {
        return res.status(400).json({ error: 'La calificación es obligatoria, debe ser un número entre 0 y 100.' });
    }

    next();
};


module.exports = {
    validateAlumno,
    validateProfesor,
    validateAsignatura,
    validateCalificacion,
};
