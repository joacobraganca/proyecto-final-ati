import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton/CustomButton';
import * as RootNavigation from '../../navigation/RootNavigation';
import {useDispatch} from 'react-redux';
import {clearTasks} from '../../actions/tasks';
import {clearPatients} from '../../actions/patients';
import {
  clearEmergencyServices,
  clearHospitals,
  clearPartnerServices,
  clearPathologies,
} from '../../actions/misc';

const MainScreen = ({priorityTasks, otherTasks, patients, navigation}) => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  let closedTasks = 0;
  let pendingTasks = 0;
  let openedTasks = 0;
  priorityTasks.forEach(t => {
    if (t.status === 'cerrado') {
      closedTasks++;
    } else if (t.status === 'pendiente') {
      pendingTasks++;
    } else {
      openedTasks++;
    }
  });
  let otherTasksCount = otherTasks.length;
  let patientsCount = patients.length;

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    const user = await AsyncStorage.getItem('@user_name');
    setUsername(user);
  };

  const logout = () => {
    dispatch(clearTasks([]));
    dispatch(clearPatients([]));
    dispatch(clearEmergencyServices([]));
    dispatch(clearHospitals([]));
    dispatch(clearPartnerServices([]));
    dispatch(clearPathologies([]));
    AsyncStorage.clear();
    RootNavigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardsRow}>
        <View style={[styles.card, styles.cardPatient]}>
          <Text>Bienvenido al gestor de la casa de salud</Text>

          <View style={styles.items}>
            <View style={styles.item}>
              <Text style={styles.number}>{username}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.cardsRow}>
        <View style={[styles.card, styles.cardPatient]}>
          <Text>Tareas Prioritarias</Text>
          <View style={styles.items}>
            <View style={styles.item}>
              <Text style={styles.number}>{pendingTasks}</Text>
              <Text>Pendientes</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.number}>{openedTasks}</Text>
              <Text>En Curso</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.number}>{closedTasks}</Text>
              <Text>Cerradas</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.cardsRow}>
        <View style={[styles.card, styles.cardTask]}>
          <Text>Otras Tareas</Text>
          <View style={styles.items}>
            <View style={styles.item}>
              <Text style={styles.number}>{otherTasksCount}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.card, styles.cardTask]}>
          <Text>Pacientes</Text>
          <View style={styles.items}>
            <View style={styles.item}>
              <Text style={styles.number}>{patientsCount}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.item}>
        <CustomButton text="Cerrar sesión" type={false} onPress={logout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 30,
    backgroundColor: '#EDF9FC',
    height: '100%',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    paddingVertical: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  cardTask: {width: '45%'},
  cardPatient: {width: '100%'},
  items: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  item: {
    alignItems: 'center',
  },
  number: {
    fontSize: 26,
  },
});

const mapStateToProps = state => {
  return {
    priorityTasks: state.taskReducer.priorityTaskList,
    otherTasks: state.taskReducer.otherTaskList,
    patients: state.patientReducer.patients,
  };
};
export default connect(mapStateToProps)(MainScreen);
