import React from 'react';
import {View, Text, Linking} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PatientContactsScreen = ({route, patients}) => {
  const patient = patients.find(x => x._id === route.params.id);

  return (
    <View>
      <View>
        {patient.contacts.map(contact => (
          <View>
            <Text> {contact.name}</Text>
            <TouchableOpacity
              onPress={() => handleWhatsappPress(contact, patient)}>
              <Icon name="whatsapp" type="font-awesome-5" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCallPress(contact)}>
              <Icon name="phone-alt" type="font-awesome-5" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const handleWhatsappPress = async (contact, patient) => {
  await Linking.openURL(
    'https://wa.me/+598' +
      contact.phone +
      '?text=Buenos dias ' +
      contact.name +
      ', te contactamos desde la Casa de Salud por el paciente ' +
      patient.name,
  );
};

const handleCallPress = async contact => {
  await Linking.openURL('tel:+598' + contact.phone);
};

const mapStateToProps = state => {
  return {
    patients: state.patientReducer.patients,
  };
};
export default connect(mapStateToProps)(PatientContactsScreen);
