const { green } = require("colors");
const Task = require("./task");

class Tasks {
  
  /**
   * _list: 
   * { 'uiid-12323-213213': {id: '', description: '', dateComplete: null } }
   */
  _list = {};

  constructor() {
    this._list = {};

  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  editTask(task = {}) {
    this._list[task.id] = task;
  }

  deleteTask(id = '') {
    delete this._list[id];
  }

  getTask(id = '') {
    return this._list[id];
  }

  createLists(tasks) {
    tasks.forEach(task => {
      this._list[task.id] = task;
    })
  }

  getList() {
    return Object.values(this._list);
  }
  
  
  getListUser(list = this.getList()) {
    console.log();
    const listUser = list.forEach((value, index) => {
      const pos = `${index + 1}.`.green;
      const description = `${value.description} :: ${value.dateComplete ? 'Completada'.green : 'Pendiente'.red}`;
      console.log(`${pos} ${description}`);
    });
  }
  
  getListComplete() {
    this.getListUser(this.getList().filter((val) => !!val.dateComplete));
  }
  
  getListPending() {
    this.getListUser(this.getList().filter((val) => !val.dateComplete));
  }

  getListSelect() {

  }

  completeTasks(ids = []) {
    ids.forEach(id => {
      if( this._list[id] && !this._list[id].dateComplete) {
        this._list[id].dateComplete = new Date().toISOString();
      }
    });
    Object.keys(this._list).forEach(key => {
      if(!ids.includes(key)) {
        this._list[key].dateComplete = null;
      }
    })
  }
  
  deleteTask(id = '') {
    if( this._list[id]) {
      delete this._list[id];
    }

  }

}

module.exports = Tasks;