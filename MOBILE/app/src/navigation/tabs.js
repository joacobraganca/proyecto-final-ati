import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text} from 'react-native';
import TasksScreen from '../screens/TasksScreen';
import PatientsScreen from '../screens/PatientsScreen';
import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Tasks"
      style={styles.bar}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#9DD1DB',
      }}>
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarLabel: 'Tareas',
          tabBarIcon: ({color, size}) => (
            <Icon name="tasks" type="font-awesome-5" />
          ),
        }}
      />
      <Tab.Screen
        name="Patients"
        component={PatientsScreen}
        options={{
          tabBarLabel: 'Pacientes',
          tabBarIcon: ({color, size}) => (
            <Icon name="user-friends" type="font-awesome-5" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
  },
  tab: {alignItems: 'center', justifyContent: 'center', top: 10},
});
export default Tabs;
