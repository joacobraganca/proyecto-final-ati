import {createStore, combineReducers} from 'redux';
import taskReducer from './reducers/taskReducer';
import patientReducer from './reducers/patientReducer';
import miscReducer from './reducers/miscReducer';

const rootReducer = combineReducers({
  taskReducer: taskReducer,
  patientReducer: patientReducer,
  miscReducer: miscReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
