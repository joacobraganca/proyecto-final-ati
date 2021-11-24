import * as React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PriorityTaskScreen from '../screens/PriorityTaskScreen';
import OtherTaskScreen from '../screens/OtherTaskScreen';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const Tasks = ({priority, other}) => {
  return (
    <Tab.Navigator
      initialRouteName="Prioritarias"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#9DD1DB',
      }}>
      <Tab.Screen
        name="Prioritarias"
        component={PriorityTaskScreen}
        initialParams={{priority}}
        options={{
          tabBarLabel: 'Prioritarias',
        }}
      />
      <Tab.Screen
        name="Otras"
        component={OtherTaskScreen}
        initialParams={{other}}
        options={{
          tabBarLabel: 'Otras',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bar: {},
  tab: {alignItems: 'center', justifyContent: 'center', top: 10},
});
export default Tasks;
