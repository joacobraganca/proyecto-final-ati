import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, addons} from 'react-native';
import Tasks from '../../navigation/tasks';
import {NavigationContainer} from '@react-navigation/native';
import {getTasks} from '../../services/task.service';
import {connect, useDispatch} from 'react-redux';
import {addPriorityTask} from '../../actions/tasks';
import {addOtherTask} from '../../actions/tasks';

const TasksScreen = () => {
  const [priorityTasks, setPriorityTasks] = useState([]);
  const [otherTasks, setOtherTasks] = useState([]);

  const dispatch = useDispatch();

  // const savePriorityTasks = priorityTasks =>
  //   dispatch(addPriorityTask(priorityTasks));
  // const saveOtherTasks = otherTasks => dispatch(addOtherTask(otherTasks));

  useEffect(() => {
    tasks();
    // savePriorityTasks(priorityTasks);
    // saveOtherTasks(otherTasks);
  }, [dispatch]);

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
    setPriorityTasks(priority);
    setOtherTasks(other);
    priority => dispatch(addPriorityTask(priority));
    other => dispatch(addOtherTask(other));
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
