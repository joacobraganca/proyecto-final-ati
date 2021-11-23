import React, {useEffect, useReducer, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomList from '../../components/Patient/CustomList/CustomList';
import {getPatients} from '../../services/patient.service'

const PatientsScreen = () => {
  const [patients, setPatients] = useState('');

  useEffect(() =>{
    const patientsList = getPatients(AsyncStorage.getItem('@healthhome_id'))
    setPatients(patientsList);
  });

  //const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <CustomList props={patients}/>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  errorMsg: {
    justifyContent: 'center',
    color: 'red',
    fontSize: 14,
  },
});

export default PatientsScreen;
