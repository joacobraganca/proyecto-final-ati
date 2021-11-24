import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Tasks from '../../navigation/tasks';
import {NavigationContainer} from '@react-navigation/native';
import {getTasks} from '../../services/task.service';
import {useDispatch} from 'react-redux';
import {addPriorityTask} from '../../actions/tasks';
import {addOtherTask} from '../../actions/tasks';

const TasksScreen = () => {
  const dispatch = useDispatch();

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
