import React from 'react';
import {View, Text} from 'react-native';
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
    <View>
      <View>
        <View>
          <Icon name="hospital" size={46} type="font-awesome-5" />
          <Text>Mutualista:</Text>
          <Text>{hospital}</Text>
        </View>
        <View>
          <Icon name="ambulance" size={46} type="font-awesome-5" />
          <Text>Serv. de emergencia:</Text>
          <Text>{emService}</Text>
        </View>
        <View>
          <Icon name="user-md" size={46} type="font-awesome-5" />
          <Text>Médico de cabecera:</Text>
          <Text>{patient.gpDoctor}</Text>
        </View>
        <View>
          <Icon name="user-friends" size={46} type="font-awesome-5" />
          <Text>Serv. de acompañante:</Text>
          <Text>{partService}</Text>
        </View>
      </View>
      <View>
        <Icon />
        <Text>Patologías:</Text>
        <View>
          {pathologiesList.map(p => (
            <Text> - {p.name}</Text>
          ))}
        </View>
      </View>
      <View>
        <Icon />
        <Text>Cuidados y comentarios:</Text>
        <Text>{patient.caresAndComments}</Text>
      </View>
    </View>
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

export default connect(mapStateToProps)(PatientProfileScreen);
