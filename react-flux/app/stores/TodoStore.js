import AppDispatcher from '../dispatcher/AppDispatcher';
import { TodoConstants } from '../constants/TodoConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _store = {
  list: [],
  spinner: {
    show: false,
    rectCount: 5,
  },
};

class TodoStoreClass extends EventEmitter {

  getAll() {
    return _store;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

}

const TodoStore = new TodoStoreClass();

AppDispatcher.register(payload => {
  const action = payload.action;

  switch (action.actionType) {

    case TodoConstants.UPDATE_LIST:

      _store = action.obj;
      // _store.list = action.list;
      // _store.spinner = action.spinner;
      TodoStore.emitChange();
      break;

    default:
      return true;
  }
});

export default TodoStore;
