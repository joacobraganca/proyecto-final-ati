import React from 'react';
import {View, Text} from 'react-native';
import CustomImput from '../../components/CustomImput';
import CustomList from '../../components/CustomList';
import {connect} from 'react-redux';

const PriorityTaskScreen = ({priority}) => {
  return (
    <View>
      <CustomList value={priority} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    priorityTasks: state.taskReducer.priorityTasks,
  };
};
export default connect(mapStateToProps)(PriorityTaskScreen);
