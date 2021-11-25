import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomList from '../../components/Patient/CustomList/CustomList';
import {getPatientsByHome} from '../../services/patient.service';

const PatientDetailScreen = ({route, navigation}) => {
  const x = route.params;
  return (
    <View>
      <Text>{x}</Text>
    </View>
  );
};

export default PatientDetailScreen;
