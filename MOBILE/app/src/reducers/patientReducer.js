import {LIST_PATIENTS} from '../actions/types';

const initialState = {
  patients: [],
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_PATIENTS:
      return {
        ...state,
        patients: action.data,
      };
      return;

    default:
      return state;
  }
};

export default patientReducer;
