import React from 'react';
import Patients from '../../navigation/patient';

import {NavigationContainer} from '@react-navigation/native';
const PatientDetailScreen = ({route}) => {
  return (
    <NavigationContainer independent={true}>
      <Patients id={route.params} />
    </NavigationContainer>
  );
};

export default PatientDetailScreen;
