import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

const PatientProfileScreen = ({
  route,
  patients,
  hospitals,
  emergencyServices,
  pathologies,
  partnerServices,
}) => {
  const patient = patients.find(x => x._id === route.params.id);

  const filterData = (service, id) => {
    return service.find(h => h._id === id);
  };

  const hospital = filterData(hospitals, patient.hospital, 'hospital').name;
  const emService = filterData(
    emergencyServices,
    patient.emergencyService,
  ).name;
  const partService = filterData(partnerServices, patient.partnerService).name;

  let pathologiesList = [];
  patient.pathologies.forEach(p => {
    pathologiesList.push(filterData(pathologies, p));
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.userData}>
            <View style={styles.photo}>
              <Icon size={80} name="user-alt" type="font-awesome-5" />
            </View>
            <View>
              <Text style={styles.name}>{patient.name}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.principalData}>
              <View style={styles.item}>
                <Icon
                  color="silver"
                  size={34}
                  name="hospital"
                  type="font-awesome-5"
                />
                <Text style={styles.itemsTitle}>Mutualista</Text>
                <Text style={styles.itemsText}>{hospital}</Text>
              </View>
              <View style={styles.item}>
                <Icon
                  size={34}
                  color="silver"
                  name="ambulance"
                  type="font-awesome-5"
                />
                <Text style={styles.itemsTitle}>Serv. de emergencia</Text>
                <Text style={styles.itemsText}>{emService}</Text>
              </View>
            </View>
            <View style={styles.principalData}>
              <View style={styles.item}>
                <Icon
                  size={34}
                  color="silver"
                  name="user-md"
                  type="font-awesome-5"
                />
                <Text style={styles.itemsTitle}>Médico de cabecera</Text>
                <Text style={styles.itemsText}>{patient.gpDoctor}</Text>
              </View>
              <View style={styles.item}>
                <Icon
                  size={34}
                  color="silver"
                  name="user-friends"
                  type="font-awesome-5"
                />
                <Text style={styles.itemsTitle}>Serv. de acompañante</Text>
                <Text style={styles.itemsText}>{partService}</Text>
              </View>
            </View>
          </View>
          <View style={styles.secondaryData}>
            <View style={styles.rowTitle}>
              <Icon size={24} name="virus" type="font-awesome-5" />
              <Text style={styles.title}>Patologías:</Text>
            </View>
            <View style={styles.content}>
              {pathologiesList.map(p => (
                <Text key={p.name}> - {p.name}</Text>
              ))}
            </View>
          </View>
          <View style={styles.secondaryData}>
            <View style={styles.rowTitle}>
              <Icon
                size={24}
                name="hand-holding-medical"
                type="font-awesome-5"
              />
              <Text style={styles.title}>Cuidados y comentarios:</Text>
            </View>
            <View style={styles.content}>
              <Text>{patient.caresAndComments}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    patients: state.patientReducer.patients,
    hospitals: state.miscReducer.hospitals,
    pathologies: state.miscReducer.pathologies,
    emergencyServices: state.miscReducer.emergencyServices,
    partnerServices: state.miscReducer.partnerServices,
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#EDF9FC',
    height: '100%',
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  userData: {flexDirection: 'column', marginBottom: 10},
  photo: {
    margin: 10,
  },
  name: {
    fontSize: 22,
  },
  rowContainer: {
    marginVertical: 10,
  },
  principalData: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  itemsTitle: {fontSize: 14},
  itemsText: {fontSize: 12},
  secondaryData: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rowTitle: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  content: {
    paddingLeft: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 5,
  },
});

export default connect(mapStateToProps)(PatientProfileScreen);
