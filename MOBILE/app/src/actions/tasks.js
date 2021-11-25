import {LIST_TASKS, CLEAR_TASKS} from './types';

export const addTasks = tasks => ({
  type: LIST_TASKS,
  data: tasks,
});

export const clearTasks = tasks => ({
  type: CLEAR_TASKS,
  data: tasks,
});
