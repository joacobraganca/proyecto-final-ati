import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import PatientProfileScreen from '../screens/PatientProfileScreen';
import PatientContactsScreen from '../screens/PatientContactsScreen';

const Tab = createBottomTabNavigator();

const Patients = ({id}) => {
  return (
    <Tab.Navigator
      initialRouteName="Perfil"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#9DD1DB',
      }}>
      <Tab.Screen
        name="Perfil"
        initialParams={{id}}
        component={PatientProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, size}) => (
            <Icon name="person" size={24} type="MaterialIcons" />
          ),
        }}
      />
      <Tab.Screen
        name="Contactos"
        initialParams={{id}}
        component={PatientContactsScreen}
        options={{
          tabBarLabel: 'Contactos',
          tabBarIcon: ({color, size}) => (
            <Icon name="address-book" size={24} type="font-awesome-5" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Patients;
