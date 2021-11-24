import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, addons} from 'react-native';
import Tasks from '../../navigation/tasks';
import {NavigationContainer} from '@react-navigation/native';
import {getTasks} from '../../services/task.service';
import {connect, useDispatch} from 'react-redux';
import {addPriorityTask} from '../../actions/tasks';
import {addOtherTask} from '../../actions/tasks';
const dispatch = useDispatch();

const TasksScreen = () => {
  const [priorityTasks, setPriorityTasks] = useState([]);
  const [otherTasks, setOtherTasks] = useState([]);

  const savePriorityTasks = p => dispatch(addPriorityTask(p));
  const saveOtherTasks = o => dispatch(addOtherTask(o));

  useEffect(() => {
    tasks();
    // savePriorityTasks(priorityTasks);
    // saveOtherTasks(otherTasks);
  }, []);

  const tasks = async () => {
    const priority = [];
    const other = [];
    const tasks = await getTasks();
    tasks.forEach(task => {
      if (task.priority) {
        priority.push(task);
      } else {
        other.push(task);
      }
    });
    // setPriorityTasks(priority);
    // setOtherTasks(other);
    savePriorityTasks(priority);
    saveOtherTasks(other);
  };

  return (
    <NavigationContainer independent={true}>
      <Tasks />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
  },
});

// const mapStateToProps = state => {
//   return {
//     priorityTasks: state.taskReducer.priorityTasks,
//     otherTasks: state.taskReducer.otherTasks,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     addPriorityTask: priorityTasks => dispatch(addPriorityTask(priorityTasks)),
//     addOtherTask: otherTasks => dispatch(addOtherTask(otherTasks)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(TasksScreen);
export default TasksScreen;
