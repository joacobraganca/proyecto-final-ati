import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {Icon} from 'react-native-elements';

const CustomListItem = ({value}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}
        onPress={() => RootNavigation.navigate('PatientDetail', value._id)}>
        <View style={styles.photo}>
          <Icon
            name="user-alt"
            color="skyblue"
            size={26}
            type="font-awesome-5"
          />
        </View>

        <View style={styles.name}>
          <Text style={styles.taskName}>{value.name}</Text>
        </View>
        <View style={styles.profile}>
          <Icon
            name="angle-right"
            color="skyblue"
            size={26}
            type="font-awesome-5"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  photo: {
    width: '10%',
  },
  name: {
    paddingLeft: 10,
    width: '80%',
  },
  profile: {
    alignItems: 'center',
    width: '10%',
  },
  taskName: {
    fontSize: 16,
    marginBottom: 2,
  },
  patientName: {
    fontSize: 12,
    marginBottom: 2,
  },
});

export default CustomListItem;
