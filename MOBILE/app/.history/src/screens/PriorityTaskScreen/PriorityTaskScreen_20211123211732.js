import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CustomImput from '../../components/CustomImput';
import CustomList from '../../components/CustomList';
import {connect, useSelector} from 'react-redux';

const PriorityTaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const list = useSelector(state => state.taskReducer.priorityTaskList);
  // setTasks(useSelector(state => state.taskReducer.priorityTasks));

  return (
    <View>
      <CustomList value={list} />
    </View>
  );
};

// const mapStateToProps = state => {
//   return {
//     tasks: state.taskReducer.priorityTasks,
//   };
// };

// export default connect(mapStateToProps)(PriorityTaskScreen);
export default PriorityTaskScreen;
