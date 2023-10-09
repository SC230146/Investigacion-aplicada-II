const express = require('express');
const app = express();
app.use(express.json());
const port = 443;

// Establecer los arreglos
const carreras = [
  { id: 1, nombre: 'Ingenieria', ciclos: 4 },
  { id: 2, nombre: 'Tecnico', ciclos: 10 }
];

const materiasTecnico = [
  { id: 1, nombre: 'Algebra Vectorial', codigo: 'ALG', UV: 4, carrera_id: 2 },
  { id: 2, nombre: 'Antropologia Filosofica', codigo: 'ANF', UV: 3, carrera_id: 2 },
  {id:3,nombre:'Lenguaje de Marcado y stilo web',codigo:'LME',UV:4,carrera_id:2},
    {id:4,nombre:'Programacion de Algoritmos',codigo:'PAL',UV:4,carrera_id:2},
    {id:5,nombre:'Redes de Comunicacion',codigo:'REC',UV:4,carrera_id:2},
    {id:6,nombre:'Desarrollo de Aplicaciones web',codigo:'DAW',UV:4,carrera_id:2},
    {id:7,nombre:'Programacion Orientada a objetos',codigo:'POO',UV:4,carrera_id:2},
    {id:8,nombre:'Desarrollo para Moviles',codigo:'DSM',UV:4,carrera_id:2},
    {id:9,nombre:'Seguridad en Redes',codigo:'SDR',UV:4,carrera_id:2},
    {id:10,nombre:'Servidores de plataformas',codigo:'SPP',UV:4,carrera_id:2}
];

const materiasIngenieria = [
  { id: 1, nombre: 'Algebra Vectorial', codigo: 'ALG', UV: 4, carrera_id: 1 },
  { id: 2, nombre: 'Antropologia Filosofica', codigo: 'ANF', UV: 3, carrera_id: 1 },
  {id:3,nombre:'Pensamiento Social Cristiano',codigo:'PSC',UV:3,carrera_id:1},
    {id:4,nombre:'Calculo Diferencial',codigo:'CAD',UV:4,carrera_id:1},
    {id:5,nombre:'Ecuaciones Diferenciales',codigo:'EDI',UV:4,carrera_id:1},
    {id:6,nombre:'Aplicaciones de Metodos',codigo:'APN',UV:4,carrera_id:1},
    {id:7,nombre:'Arquitectura de Computadoras',codigo:'ACO',UV:4,carrera_id:1},
    {id:8,nombre:'Gestion Ambiental',codigo:'GEA',UV:4,carrera_id:1},
    {id:9,nombre:'Programacion Estructurada',codigo:'PRE',UV:4,carrera_id:1},
    {id:10,nombre:'Quimica General',codigo:'QUG',UV:4,carrera_id:1}
];

// Arreglo de prerequisitos
const prerrequisitos = [
  //para los tecnicos
  { materia_codigo: 'ALG', prerrequisito_codigo: '' },
  { materia_codigo: 'ANF', prerrequisito_codigo: '' },
  { materia_codigo: 'POO', prerrequisito_codigo: 'PAL' },
  { materia_codigo: 'REC', prerrequisito_codigo: '' },
  { materia_codigo: 'PAL', prerrequisito_codigo: '' },
  { materia_codigo: 'SDR', prerrequisito_codigo: 'REC' },
  { materia_codigo: 'SPP', prerrequisito_codigo: 'REC' },
  { materia_codigo: 'DAW', prerrequisito_codigo: 'LME' },
  { materia_codigo: 'DSM', prerrequisito_codigo: 'DAW' },
  { materia_codigo: 'LME', prerrequisito_codigo: '' },

  //Para la ingenieria
  { materia_codigo: 'ALG', prerrequisito_codigo: '' },
  { materia_codigo: 'ANF', prerrequisito_codigo: '' },
  { materia_codigo: 'PSC', prerrequisito_codigo: '' },
  { materia_codigo: 'CAD', prerrequisito_codigo: 'MAT2' },
  { materia_codigo: 'EDI', prerrequisito_codigo: 'MAT2' },
  { materia_codigo: 'APN', prerrequisito_codigo: 'MAT2' },
  { materia_codigo: 'ACO', prerrequisito_codigo: 'MAT2' },
  { materia_codigo: 'GEA', prerrequisito_codigo: 'MAT2' },
  { materia_codigo: 'PRE', prerrequisito_codigo: 'MAT2' },
  { materia_codigo: 'QUG', prerrequisito_codigo: 'MAT2' },
];

// Arreglo para la inscripción de materias
const materiasDisponiblesPorCarrera = {
  tecnico: [
    { id: 1, nombre: 'Algebra Vectorial y Matrices', UV: 4 },
    { id: 2, nombre: 'Antroplogia Filosofica', UV: 3 },
    {id:3,nombre:'Pensamiento Social Cristiano', UV:3},
    {id:3,nombre:'Calculo Diferencial', UV:4}
  ],
  ingenieria: [
    { id: 1, nombre: 'Algebra Vectorial', UV: 4 },
    { id: 2, nombre: 'Antroopologia', UV: 3 },
    {id:3,nombre:'Programacion Orientada a Objetos', UV:4},
        {id:3,nombre:'Redes de Comunicacion', UV:4}
  ],
};

// Parte de los obtener resultados JSON
app.use(express.json());

// Establecer todas las rutas
app.use(express.static('C:\Users\david\Downloads\API'));

// HTML para las rutas
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/main.html');
});

// Las materias de las dos carreras
app.get('/materiasIngenieria', (req, res) => {
  const materias = materiasIngenieria.map(materia => ({ id: materia.id, nombre: materia.nombre }));
  res.json(materias);
});

app.get('/materiasTecnico', (req, res) => {
  const materias = materiasTecnico.map(materia => ({ id: materia.id, nombre: materia.nombre }));
  res.json(materias);
});

app.get('/carreras', (req, res) => {
  const nombresCarreras = carreras.map(carrera => carrera.nombre);
  res.json(nombresCarreras);
});

//Para ver los prerrequisitos de cada materia y que se necesita para cursarla
app.get('/prerrequisitos/:codigoMateria', (req, res) => {
    const codigoMateria = req.params.codigoMateria;
    const prerrequisitosMateria = prerrequisitos.filter(prerrequisito => prerrequisito.materia_codigo === codigoMateria);
  
    if (prerrequisitosMateria.length === 0) {
      res.status(404).json({ mensaje: 'No se encontraron prerrequisitos para esta materia.' });
    } else {
      res.json(prerrequisitosMateria);
    }
  });

  // Para ver las materias en cada ciclo, como en las dos carreras solo son 10 en el primer año son 4 materias
  //y en el segundo ciclo son 6 
  app.get('/materiasPorCiclo/:carrera/:ciclo', (req, res) => {
    const carrera = req.params.carrera;
    const ciclo = parseInt(req.params.ciclo);
    let materiasPorCiclo = [];

    // Filtra las materias según la carrera y el ciclo
    if (carrera === 'tecnico') {
        materiasPorCiclo = obtenerMateriasPorCiclo(materiasTecnico, ciclo, 2); // 2 ciclos por año
    } else if (carrera === 'ingenieria') {
        materiasPorCiclo = obtenerMateriasPorCiclo(materiasIngenieria, ciclo, 2); // 2 ciclos por año
    } else {
        return res.status(404).json({ mensaje: 'Carrera no válida.' });
    }
    res.json(materiasPorCiclo);
});


// Función para obtener las materias por ciclo
function obtenerMateriasPorCiclo(materias, ciclo, ciclosPorAnio) {
    const materiasPorCiclo = [];
    const materiasPorAnio = Math.ceil(materias.length / ciclosPorAnio);

    if (ciclo < 1 || ciclo > ciclosPorAnio) {
        return materiasPorCiclo;
    }

    for (let i = (ciclo - 1) * materiasPorAnio; i < ciclo * materiasPorAnio && i < materias.length; i++) {
        materiasPorCiclo.push(materias[i]);
    }

    return materiasPorCiclo;
}


//Inscripcion de materias

app.post('/inscripcion', (req, res) => {
    const materia = {
        id: req.body.id,
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        UV: req.body.UV
    };

    const materiasInscritas = []; 
    const UVTotal = materiasInscritas.reduce((total, materia) => total + materia.UV, 0);

    const limiteUV = 16;

    if (UVTotal + materia.UV > limiteUV) {
        return res.status(400).json({ mensaje: 'No te alcanzan las unidades valorativas.' });
    }

    materiasInscritas.push(materia);

    res.json({ mensaje: 'Materia inscrita exitosamente.' });
});



//Ruta para eliminar

app.delete('/inscripcion/:id', (req, res) => {
    const inscripcionId = parseInt(req.params.id);
    
    // Encuentra y elimina la inscripción de materias por ID
    const index = inscripciones.findIndex(inscripcion => inscripcion.id === inscripcionId);
    if (index === -1) {
        return res.status(404).json({ mensaje: 'Inscripción no encontrada.' });
    }
    
    const inscripcionEliminada = inscripciones.splice(index, 1);
    
    res.json({ mensaje: 'Inscripción eliminada exitosamente.', inscripcion: inscripcionEliminada });
});



// Usar el puerto y verificar que el servidor está corriendo correctamente (puerto 443)
app.listen(port, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
});
