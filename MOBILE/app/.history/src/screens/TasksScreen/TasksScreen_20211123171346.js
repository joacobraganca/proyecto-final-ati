import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Tasks from '../../navigation/tasks';
import {NavigationContainer} from '@react-navigation/native';

const TasksScreen = () => {
  const [priorityTasks, setPriorityTasks] = useState([]);
  const [otherTasks, setOtherTasks] = useState([]);

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
