const { argv } = require('./config/yargs');
const colors = require('colors')
const { crear, getListado, actualizar, borrar } = require('./tareas/tareas');

let comando = argv._[0];
switch(comando) {
    case 'crear':
        let tarea = crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = getListado();
        for(let item of listado){
            console.log('===== Por hacer ====='.green);
            console.log(`Descripción: ${item.descripcion}`);
            console.log(`Completado: ${item.completado}`);
            console.log('========================'.green);
        }
        break;
    case 'actualizar':
        let actualizado = actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('Comando no reconocido');
}