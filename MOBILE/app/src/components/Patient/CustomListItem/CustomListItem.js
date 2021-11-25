import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as RootNavigation from '../../../navigation/RootNavigation';

const CustomListItem = ({value}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}
        onPress={() => RootNavigation.navigate('PatientDetail', value._id)}>
        <View style={styles.details}>
          <Text>{value.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDF9FC',
    padding: 10,
    fontSize: 18,
    height: 80,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: '20%',
  },
  details: {
    width: '50%',
  },
  datetime: {
    width: '30%',
  },
});

export default CustomListItem;
