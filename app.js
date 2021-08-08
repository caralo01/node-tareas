require ('colors');

const { inquirerMenu, pause, readInput, listTasks, confirmAction } = require('./helpers/inquirer');
const { saveData, readDB } = require('./helpers/services');
const Task = require('./models/task');
const Tasks = require('./models/tasks');


const main = async () => {
  
  let opt = '';
  const tasks = new Tasks();

  const info = readDB();

  if(info) {
    tasks.createLists(info);
  }


  do {
    opt = await inquirerMenu();

    switch(opt) {
      case '1':
        // Create task
        const desc = await readInput('Descripción: ');
        tasks.createTask(desc);
        break;
      case '2':
        tasks.getListUser();
        break;
      case '3':
        tasks.getListComplete();
        break;
      case '4':
        tasks.getListPending();
        break;
      case '5':
        const ids = await listTasks(tasks.getList(), true);
        tasks.completeTasks(ids);
        break;
      case '6':
        const id = await listTasks(tasks.getList());
        if(idd !== '0') {
          const ok = await confirmAction();
          if(ok){
            tasks.deleteTask(id);
            console.log("Tarea borrada correctamente")
          }  else {
            console.log("La tarea finalmente no se borró")
          }
        }
        break;
    }

    saveData(tasks.getList())  
    await pause();
    
  }  while(opt !== '0');
}

main();