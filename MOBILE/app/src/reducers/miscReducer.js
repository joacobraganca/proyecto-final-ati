import {
  LIST_HOSPITALS,
  LIST_PATHOLOGIES,
  LIST_EMERGENCY_SERVICES,
  LIST_PARTNER_SERVICE,
  CLEAR_EMERGENCY_SERVICES,
  CLEAR_HOSPITALS,
  CLEAR_PATHOLOGIES,
  CLEAR_PARTNER_SERVICE,
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
    case LIST_PATHOLOGIES:
      return {
        ...state,
        pathologies: action.data,
      };
    case LIST_EMERGENCY_SERVICES:
      return {
        ...state,
        emergencyServices: action.data,
      };
    case LIST_PARTNER_SERVICE:
      return {
        ...state,
        partnerServices: action.data,
      };

    case CLEAR_PARTNER_SERVICE:
      return {
        ...state,
        partnerServices: [],
      };
    case CLEAR_HOSPITALS:
      return {
        ...state,
        hospitals: [],
      };
    case CLEAR_PATHOLOGIES:
      return {
        ...state,
        pathologies: [],
      };
    case CLEAR_EMERGENCY_SERVICES:
      return {
        ...state,
        emergencyServices: [],
      };
    default:
      return state;
  }
};

export default miscReducer;
