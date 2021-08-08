const inquirer = require('inquirer');
require('colors');


const inquirerMenu = async () => {
  const questions = [
    {
      type: 'list',
      name: 'option',
      message: '¿Que desea hacer?',
      choices: [
        {
          value: '1',
          name: `${"1.".green} Crear tarea`,
        },
        {
          value: '2',
          name: `${'2.'.green} Listar tareas`,
        },
        {
          value: '3',
          name: `${'3.'.green} Listar tareas completadas`,
        },
        {
          value: '4',
          name: `${'4.'.green} Listar tareas pendientes`,
        },
        {
          value: '5',
          name: `${'5.'.green} Completar tarea(s)`,
        },
        {
          value: '6',
          name: `${'6.'.green} Borrar tarea`,
        },
        {
          value: '0',
          name: `${'0.'.green} Salir \n`,
        },   
      ]
    }
  ];
    console.clear();
    console.log('========================'.green);
    console.log(' Selecciona una opción'.white);
    console.log('========================'.green);

    const opt = await inquirer.prompt(questions);

    return opt.option;
    
}

const readInput = async (message)  => {
  const { description } =  await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message,
      validate( value) {
        if(value.length === 0) {
          return 'Por favor ingrese valor';
        }

        return true;
      }
    }
  ]);

  return description;
}


const pause = async () => {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'enter',
      message: `\nPresione ${'ENTER'.green} para continuar`
    }
  ])
}

const listTasks = async (tasks = [], isCompleted = false) => {
  const choices = !isCompleted ? [{
    value: '0',
    name: '0'.green + ' Cancelar'
  }] : [];
  const questions = [
    {
      type: isCompleted ? 'checkbox' : 'list',
      name: 'value',
      message: '¿Que desea hacer?',
      choices: choices.concat(tasks.map((item, index) => {
        const pos = `${index + 1}.`.green;
        return {
          value: item.id,
          name: `${pos} ${item.description}`,
          checked: isCompleted ? !!item.dateComplete : undefined
        }
      }))
    }
  ];

  const { value } = await inquirer.prompt(questions);

  return value;

}

const confirmAction = async () => {
  const questions = [
    {
      type: 'confirm',
      name: 'option',
      message: 'Estás seguro?'
    }
  ];

  const { option } = await inquirer.prompt(questions);

  return option;

}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listTasks,
  confirmAction
};