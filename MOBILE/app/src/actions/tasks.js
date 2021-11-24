import {LIST_TASKS} from './types';

export const addTasks = tasks => ({
  type: LIST_TASKS,
  data: tasks,
});
