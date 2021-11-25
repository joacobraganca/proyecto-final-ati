import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import PatientDetailScreen from '../screens/PatientDetailScreen';
import {navigationRef} from './RootNavigation';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="SignIn"
          component={SignInScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{title: 'Perfil'}}
          name="PatientDetail"
          component={PatientDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
