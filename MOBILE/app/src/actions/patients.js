import {LIST_PATIENTS} from './types';

export const addPatients = tasks => ({
  type: LIST_PATIENTS,
  data: tasks,
});
