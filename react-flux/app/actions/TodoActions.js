import AppDispatcher from '../dispatcher/AppDispatcher';
import { TodoConstants } from '../constants/TodoConstants';

export function updateList(obj) {
  AppDispatcher.handleViewAction({
    actionType: TodoConstants.UPDATE_LIST,
    obj: obj,
  });
}
