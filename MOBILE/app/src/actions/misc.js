import {
  LIST_HOSPITALS,
  LIST_PATHOLOGIES,
  LIST_EMERGENCY_SERVICES,
  LIST_PARTNER_SERVICE,
} from './types';

export const addHospitals = tasks => ({
  type: LIST_HOSPITALS,
  data: tasks,
});

export const addPathologies = tasks => ({
  type: LIST_PATHOLOGIES,
  data: tasks,
});

export const addEmergencyServices = tasks => ({
  type: LIST_EMERGENCY_SERVICES,
  data: tasks,
});

export const addPartnerServices = tasks => ({
  type: LIST_PARTNER_SERVICE,
  data: tasks,
});
