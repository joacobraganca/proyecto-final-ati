import React from 'react';
import {View, Text} from 'react-native';
import Tabs from '../../navigation/tabs';
import {NavigationContainer} from '@react-navigation/native';

const HomeScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Tabs />
    </NavigationContainer>
  );
};

export default HomeScreen;
