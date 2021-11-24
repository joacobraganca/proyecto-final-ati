import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';

const CustomListItem = {value} => {
  const [check, setCheck] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.checkbox}>
          <CheckBox
            size={30}
            left
            checked={check}
            onIconPress={() => setCheck({check: !check})}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
        </View>

        <View style={styles.details}>
          <Text>{value.name}</Text>
          <Text>{value.assignedPatient}</Text>
        </View>
        <View style={styles.datetime}>
          <Text>{value.dateTime}</Text>
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
