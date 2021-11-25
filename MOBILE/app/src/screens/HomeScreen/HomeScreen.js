import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Tabs from '../../navigation/tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getMisc} from '../../services/misc.service';
import {getPatientsByHome} from '../../services/patient.service';
import {getTasks} from '../../services/task.service';

import {addTasks} from '../../actions/tasks';
import {
  addHospitals,
  addPathologies,
  addEmergencyServices,
  addPartnerServices,
} from '../../actions/misc';
import {addPatients} from '../../actions/patients';
import {
  HOSPITALS,
  PATHOLOGIES,
  EM_SERVICE,
  PART_SERVICE,
} from '../../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const saveHospitals = h => dispatch(addHospitals(h));
  const savaPathologies = p => dispatch(addPathologies(p));
  const saveES = es => dispatch(addEmergencyServices(es));
  const savePS = ps => dispatch(addPartnerServices(ps));
  const savePatients = pa => dispatch(addPatients(pa));

  const saveTasks = t => dispatch(addTasks(t));

  useEffect(() => {
    misc();
  }, []);

  const misc = async () => {
    const houseId = await AsyncStorage.getItem('@healthhome_id');

    const hospitals = await getMisc(HOSPITALS);
    const pathologies = await getMisc(PATHOLOGIES);
    const emergencyServices = await getMisc(EM_SERVICE);
    const partnetService = await getMisc(PART_SERVICE);
    const patients = await getPatientsByHome(houseId);

    saveHospitals(hospitals);
    savaPathologies(pathologies);
    saveES(emergencyServices);
    savePS(partnetService);
    savePatients(patients);

    const priorityTasks = [];
    const otherTasks = [];
    const tasks = await getTasks();
    tasks.sort(function (a, b) {
      return new Date(a.dateTime) - new Date(b.dateTime);
    });
    tasks.forEach(task => {
      if (task.priority) {
        priorityTasks.push(task);
      } else {
        otherTasks.push(task);
      }
    });

    saveTasks({priorityTasks, otherTasks});
  };

  return (
    <NavigationContainer independent={true}>
      <Tabs />
    </NavigationContainer>
  );
};

export default HomeScreen;
