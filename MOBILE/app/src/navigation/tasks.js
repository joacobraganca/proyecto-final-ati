import * as React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PriorityTaskScreen from '../screens/PriorityTaskScreen';
import OtherTaskScreen from '../screens/OtherTaskScreen';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const Tasks = () => {
  return (
    <Tab.Navigator
      initialRouteName="Prioritarias"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#9DD1DB',
      }}>
      <Tab.Screen name="Prioritarias" component={PriorityTaskScreen} />
      <Tab.Screen name="Otras" component={OtherTaskScreen} />
    </Tab.Navigator>
  );
};

export default Tasks;
