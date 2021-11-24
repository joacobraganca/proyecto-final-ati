import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import CustomList from '../../components/CustomList';
import {connect} from 'react-redux';

const OtherTaskScreen = ({tasks, patients}) => {
  return (
    <View>
      <CustomList tasks={tasks} patients={patients} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    tasks: state.taskReducer.otherTaskList,
    patients: state.patientReducer.patients,
  };
};

export default connect(mapStateToProps)(OtherTaskScreen);
