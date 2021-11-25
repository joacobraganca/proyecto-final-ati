import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {Text} from 'react-native';
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
          tabBarLabel: ({color, size}) => (
            <Text style={{color: color, fontSize: 12}}>Perfil</Text>
          ),
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={24} type="MaterialIcons" />
          ),
        }}
      />
      <Tab.Screen
        name="Contactos"
        initialParams={{id}}
        component={PatientContactsScreen}
        options={{
          tabBarLabel: ({color, size}) => (
            <Text style={{color: color, fontSize: 12}}>Contactos</Text>
          ),
          tabBarIcon: ({color, size}) => (
            <Icon
              name="address-book"
              color={color}
              size={24}
              type="font-awesome-5"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Patients;
