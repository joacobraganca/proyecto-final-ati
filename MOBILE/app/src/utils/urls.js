const baseUrl = 'https://healthhomeapi.herokuapp.com/api';

const LOGIN = baseUrl + '/user/login';

const TASKS = baseUrl + '/task/homeId';
const PATIENTS_BY_HOME_ID = baseUrl + '/patient/homeId';
const PATIENT_BY_ID = baseUrl + '/patient/id';
const PATIENT_BY_NAME = baseUrl + '/patient/byname';

const HOSPITALS = baseUrl + '/hospital';
const PATHOLOGIES = baseUrl + '/pathologies';
const EM_SERVICE = baseUrl + '/emergencyService';
const PART_SERVICE = baseUrl + '/partnerService';

export {
  LOGIN,
  TASKS,
  PATIENTS_BY_HOME_ID,
  PATIENT_BY_ID,
  PATIENT_BY_NAME,
  HOSPITALS,
  PATHOLOGIES,
  EM_SERVICE,
  PART_SERVICE,
};
