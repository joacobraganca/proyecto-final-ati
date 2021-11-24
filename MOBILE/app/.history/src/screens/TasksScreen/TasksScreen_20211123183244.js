import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Tasks from '../../navigation/tasks';
import {NavigationContainer} from '@react-navigation/native';
import {getTasks} from '../../services/task.service';

const TasksScreen = () => {
  const [priorityTasks, setPriorityTasks] = useState([]);
  const [otherTasks, setOtherTasks] = useState([]);

  useEffect(() => {
    tasks();
  }, [priorityTasks, otherTasks]);

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
  };

  return (
    <NavigationContainer independent={true}>
      <Tasks priority={priorityTasks} other={otherTasks} />
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
