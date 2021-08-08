const { resolve } = require('path');

require('colors');

const showMenu = () => {

  return new Promise ((resolve) => {
    console.clear();
    console.log('========================');
    console.log(' Selecciona una opción');
    console.log('========================');
    
    
    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tareas`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"0.".green} Salir \n`);
    
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    readline.question('Seleccione una opción: ', (opt) => {
      resolve(opt);
  
      readline.close();
    })
  
  });
}
  
  const pausa = () => {
    return new Promise(resolve => {
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
    
      readline.question(`\nPresione ${'ENTER'.green} para continuar`, () => {
        resolve();
        readline.close();
      })

    })
  }

module.exports = {
  showMenu,
  pausa
};