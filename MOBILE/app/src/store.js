import {createStore, combineReducers} from 'redux';
import taskReducer from './reducers/taskReducer';

const rootReducer = combineReducers({
  taskReducer: taskReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
