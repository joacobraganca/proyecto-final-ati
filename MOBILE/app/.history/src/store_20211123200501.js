import {createStore, combineReducers} from 'redux';
import taskReducer from './reducers/taskReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
