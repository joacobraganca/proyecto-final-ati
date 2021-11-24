import {LIST_PRIORITY_TASKS, LIST_OTHER_TASKS} from './types';

export const addPriorityTask = tasks => ({
  type: LIST_PRIORITY_TASKS,
  data: tasks,
});

export const addOtherTask = tasks => ({
  type: LIST_OTHER_TASKS,
  data: tasks,
});
