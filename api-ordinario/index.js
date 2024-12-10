const express = require('express');

const alumnosRoutes = require('./routes/alumnos');

const profesoresRoutes = require('./routes/profesores');

const asignaturasRoutes = require('./routes/asignaturas');

const calificacionesRoutes = require('./routes/calificaciones');


const app = express();

app.use(express.json());


app.use('/api/alumnos', alumnosRoutes);

app.use('/api/profesores', profesoresRoutes);

app.use('/api/asignaturas', asignaturasRoutes);

app.use('/api/calificaciones', calificacionesRoutes);


const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Servidor corriendo en http://localhost:${PORT}`);

});

