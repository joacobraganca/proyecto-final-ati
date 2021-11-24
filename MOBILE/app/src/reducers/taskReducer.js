import {LIST_TASKS} from '../actions/types';

const initialState = {
  otherTaskList: [],
  priorityTaskList: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_TASKS:
      return {
        ...state,
        otherTaskList: action.data.otherTasks,
        priorityTaskList: action.data.priorityTasks,
      };
      return;

    default:
      return state;
  }
};

export default taskReducer;
