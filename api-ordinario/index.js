const express = require('express');
const bodyParser = require('body-parser');
const alumnosRoutes = require('./routes/alumnos');
const profesoresRoutes = require('./routes/profesores');
const asignaturasRoutes = require('./routes/asignaturas');
const calificacionesRoutes = require('./routes/calificaciones');

const app = express();
app.use(bodyParser.json());


app.use('/alumnos', alumnosRoutes);
app.use('/profesores', profesoresRoutes);
app.use('/asignaturas', asignaturasRoutes);
app.use('/calificaciones', calificacionesRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});


const PORT = 3050;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
