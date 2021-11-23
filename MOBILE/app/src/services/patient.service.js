import {PATIENTS_BY_HOME_ID, PATIENT_BY_ID, PATIENT_BY_NAME} from '../utils/urls';

const getPatients = id => {
  fetch(PATIENTS_BY_HOME_ID + '?_id=' + id, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

const getPatientById = id => {
  fetch(PATIENT_BY_ID + '?_id=' + id, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

const getPatientByName = name => {
  fetch(PATIENT_BY_NAME + '?name=' + name, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

export {getPatients, getPatientById, getPatientByName};
