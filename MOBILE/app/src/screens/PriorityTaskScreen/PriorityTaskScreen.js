import React, {useState} from 'react';
import {View} from 'react-native';
import CustomList from '../../components/CustomList';
import {connect} from 'react-redux';

const PriorityTaskScreen = ({tasks, patients}) => {
  return (
    <View>
      <CustomList tasks={tasks} patients={patients} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    tasks: state.taskReducer.priorityTaskList,
    patients: state.patientReducer.patients,
  };
};

export default connect(mapStateToProps)(PriorityTaskScreen);
