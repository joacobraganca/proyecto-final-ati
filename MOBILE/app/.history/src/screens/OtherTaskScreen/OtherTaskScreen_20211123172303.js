import React from 'react';
import {View, Text} from 'react-native';
import CustomList from '../../components/CustomList';

const OtherTaskScreen = ({other}) => {
  return (
    <View>
      <CustomList value={other} />
    </View>
  );
};

export default OtherTaskScreen;
