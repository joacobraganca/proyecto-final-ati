import {LIST_PRIORITY_TASKS, LIST_OTHER_TASKS} from '../actions/types';

const initialState = {
  priorityTaskList: [],
  otherTaskList: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_PRIORITY_TASKS:
      return;
    case LIST_OTHER_TASKS:
      return;
    default:
      return state;
  }
};
