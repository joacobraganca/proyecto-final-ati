import React from 'react';
import {View, StyleSheet, Text, Linking} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PatientContactsScreen = ({route, patients}) => {
  const patient = patients.find(x => x._id === route.params.id);

  return (
    <View style={styles.container}>
      {patient.contacts.map(contact => (
        <View style={styles.row} key={contact.phone}>
          <View style={[styles.section, styles.data]}>
            <Text style={styles.name}> {contact.name}</Text>
            <Text style={styles.phone}> {contact.phone}</Text>
          </View>
          <View style={[styles.section, styles.button]}>
            <TouchableOpacity
              onPress={() => handleWhatsappPress(contact, patient)}>
              <Icon name="whatsapp" type="font-awesome-5" />
            </TouchableOpacity>
          </View>
          <View style={[styles.section, styles.button]}>
            <TouchableOpacity onPress={() => handleCallPress(contact)}>
              <Icon name="phone-alt" type="font-awesome-5" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
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

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#EDF9FC',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  section: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    margin: 5,
  },
  data: {
    width: '65%',
    paddingLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  phone: {fontSize: 12},
  button: {
    width: '15%',
  },
});
export default connect(mapStateToProps)(PatientContactsScreen);
