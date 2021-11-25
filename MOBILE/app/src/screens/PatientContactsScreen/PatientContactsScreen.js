import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PatientContactsScreen = ({route, patients}) => {
  const patient = patients.find(x => x._id === route.params.id);

  return (
    <View>
      <View>
        {patient.contacts.map(c => (
          <View>
            <Text> {c.name}</Text>
            <TouchableOpacity>
              <Icon name="whatsapp" type="font-awesome-5" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="phone-alt" type="font-awesome-5" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    patients: state.patientReducer.patients,
  };
};
export default connect(mapStateToProps)(PatientContactsScreen);
