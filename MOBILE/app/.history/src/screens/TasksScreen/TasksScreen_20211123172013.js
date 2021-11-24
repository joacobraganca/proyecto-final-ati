import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Tasks from '../../navigation/tasks';
import {NavigationContainer} from '@react-navigation/native';
import {getTasks} from '../../services/task.service';

const TasksScreen = () => {
  const [priorityTasks, setPriorityTasks] = useState([]);
  const [otherTasks, setOtherTasks] = useState([]);

  useEffect(async () => {
    const id = AsyncStorage.getItem('@user_id');
    const tasks = await getTasks(id);
    tasks.forEach(task => {
      if (task.priority) {
        setPriorityTasks([...priorityTasks, task]);
      } else {
        setOtherTasks([...otherTasks, task]);
      }
    });
  });

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

export default TasksScreen;
