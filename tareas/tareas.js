const fs = require('fs');
const colors = require('colors');

let listadoTareas = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoTareas);

    fs.writeFile('db/data.json', data, err => {
        if(err) throw new Error('No se puedo guardar', err);
    })
}
const cargarDB = () => {

    try {
        listadoTareas = require('../db/data.json');   
    } catch (error) {
        listadoTareas = [];
    }
}
const crear = descripcion => {

    cargarDB();

    let tarea = {
        descripcion,
        completado: false
    };

    listadoTareas.push(tarea);
    guardarDB(listadoTareas);
    return tarea;
}

const getListado = () => {
    cargarDB();
    return listadoTareas;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoTareas.findIndex( item => item.descripcion === descripcion);
    
    if(index >= 0){
        listadoTareas[index].completado = completado;
        guardarDB();
        return true;
    }
    return false;
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoTareas.filter( item => item.descripcion !== descripcion);
    if(listadoTareas.length === nuevoListado.length)
        return false;
    listadoTareas = nuevoListado;
    guardarDB();
    return true;
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}