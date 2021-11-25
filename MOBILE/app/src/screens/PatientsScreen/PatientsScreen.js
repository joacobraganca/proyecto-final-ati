import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomList from '../../components/Patient/CustomList/CustomList';
import {getPatientsByHome} from '../../services/patient.service';
import {connect} from 'react-redux';

const PatientsScreen = ({patients}) => {
  return (
    <View>
      <CustomList patients={patients} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    patients: state.patientReducer.patients,
  };
};

export default connect(mapStateToProps)(PatientsScreen);
