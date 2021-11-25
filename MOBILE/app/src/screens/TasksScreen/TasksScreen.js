import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Tasks from '../../navigation/tasks';
import {NavigationContainer} from '@react-navigation/native';

const TasksScreen = () => {
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
