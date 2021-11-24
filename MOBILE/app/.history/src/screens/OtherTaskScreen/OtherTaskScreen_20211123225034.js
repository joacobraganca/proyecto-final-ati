import React from 'react';
import {View, Text} from 'react-native';
import CustomList from '../../components/CustomList';

const OtherTaskScreen = ({tasks}) => {
  return (
    <View>
      <CustomList value={tasks} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    tasks: state.taskReducer.priorityTaskList,
  };
};

export default connect(mapStateToProps)(OtherTaskScreen);
// export default PriorityTaskScreen;
