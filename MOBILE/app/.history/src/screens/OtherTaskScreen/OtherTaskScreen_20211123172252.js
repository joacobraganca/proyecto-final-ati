import React from 'react';
import {View, Text} from 'react-native';

const OtherTaskScreen = ({other}) => {
  return (
    <View>
      <CustomList value={other} />
    </View>
  );
};

export default OtherTaskScreen;
