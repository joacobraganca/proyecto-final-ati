import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomList from '../../components/Patient/CustomList/CustomList';
import {getPatients} from '../../services/patient.service';

const PatientsScreen = () => {
  const [patients, setPatients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getPatientsFunction();
  }, []);

  useEffect(() => {}, [isLoaded]);

  const getPatientsFunction = async () => {
    const tmpPatients = await getPatients();
    setPatients(tmpPatients);
    setIsLoaded(true);
  };

  const render = () => {
    if (!isLoaded) {
      return <View></View>;
    } else {
      return (
        <View style={styles.root}>
          <CustomList value={patients} />
        </View>
      );
    }
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

  return render();
};
export default PatientsScreen;
