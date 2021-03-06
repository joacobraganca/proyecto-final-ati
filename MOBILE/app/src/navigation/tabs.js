import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import TasksScreen from '../screens/TasksScreen';
import PatientsScreen from '../screens/PatientsScreen';
import MainScreen from '../screens/MainScreen';
import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#9DD1DB',
      }}>
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarLabel: ({color, size}) => (
            <Text style={{color: color, fontSize: 12}}>Tareas</Text>
          ),
          tabBarIcon: ({color, size}) => (
            <Icon name="tasks" color={color} type="font-awesome-5" />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarLabel: ({color, size}) => (
            <Text style={{color: color, fontSize: 12}}>Inicio</Text>
          ),
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} type="font-awesome-5" />
          ),
        }}
      />
      <Tab.Screen
        name="Patients"
        component={PatientsScreen}
        options={{
          tabBarLabel: ({color, size}) => (
            <Text style={{color: color, fontSize: 12}}>Pacientes</Text>
          ),
          tabBarIcon: ({color, size}) => (
            <Icon name="user-friends" color={color} type="font-awesome-5" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
