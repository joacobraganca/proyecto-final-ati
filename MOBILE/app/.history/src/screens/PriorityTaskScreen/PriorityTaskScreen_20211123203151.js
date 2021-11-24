import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CustomImput from '../../components/CustomImput';
import CustomList from '../../components/CustomList';
import {connect} from 'react-redux';

const PriorityTaskScreen = ({priority}) => {
  const [tasks, setTasks] = useState([]);

  return (
    <View>
      <CustomList value={tasks} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    tasks: state.taskReducer.priorityTasks,
  };
};
export default connect(mapStateToProps)(PriorityTaskScreen);
