const { v4: uuid } = require('uuid');

class Task {
  
  id = '';
  description = '';
  dateComplete = null;

  constructor(description) {
    this.description = description;
    this.id = uuid();
    this.dateComplete = null;

  }

}

module.exports = Task;