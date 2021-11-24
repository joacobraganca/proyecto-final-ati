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

export default connect(mapStateToProps)(PriorityTaskScreen);
