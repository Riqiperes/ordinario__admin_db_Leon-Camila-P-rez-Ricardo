const express = require('express');

const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());


// Rutas

const estudiantesRoutes = require('./routes/estudiantes');

const maestrosRoutes = require('./routes/maestros');

const materiasRoutes = require('./routes/materias');

const calificacionesRoutes = require('./routes/calificaciones');


app.use('/api/estudiantes', estudiantesRoutes);

app.use('/api/maestros', maestrosRoutes);

app.use('/api/materias', materiasRoutes);

app.use('/api/calificaciones', calificacionesRoutes);


const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Servidor corriendo en http://localhost:${PORT}`);

});

