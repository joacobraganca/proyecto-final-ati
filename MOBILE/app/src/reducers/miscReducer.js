import {
  LIST_HOSPITALS,
  LIST_PATHOLOGIES,
  LIST_EMERGENCY_SERVICES,
  LIST_PARTNER_SERVICE,
} from '../actions/types';

const initialState = {
  hospitals: [],
  pathologies: [],
  emergencyServices: [],
  partnerServices: [],
};

const miscReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_HOSPITALS:
      return {
        ...state,
        hospitals: action.data,
      };
      return;
    case LIST_PATHOLOGIES:
      return {
        ...state,
        pathologies: action.data,
      };
      return;
    case LIST_EMERGENCY_SERVICES:
      return {
        ...state,
        emergencyServices: action.data,
      };
      return;
    case LIST_PARTNER_SERVICE:
      return {
        ...state,
        partnerServices: action.data,
      };
      return;
    default:
      return state;
  }
};

export default miscReducer;
