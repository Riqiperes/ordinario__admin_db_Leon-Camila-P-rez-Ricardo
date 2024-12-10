const crearAlumno = async () => {
    const url = 'http://localhost:3050/alumnos';
    const nuevoAlumno = {
        nombre: "Juan Pérez",
        matricula: "126744"
    };

    try {
        const response = await fetch(url, {
            method: 'POST', // Método HTTP
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoAlumno) 
        });

        if (response.ok) {
            const data = await response.json(); 
            console.log("Alumno creado exitosamente:", data);
        } else {
            const errorData = await response.json();
            console.error("Error al crear el alumno:", errorData);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
};


crearAlumno();
