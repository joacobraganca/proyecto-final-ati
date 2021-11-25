import {LIST_PATIENTS, CLEAR_PATIENTS} from './types';

export const addPatients = tasks => ({
  type: LIST_PATIENTS,
  data: tasks,
});

export const clearPatients = tasks => ({
  type: CLEAR_PATIENTS,
  data: tasks,
});
