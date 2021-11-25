import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import CustomListItem from '../CustomListItem/CustomListItem';
import {ListItem} from 'react-native-elements';

const CustomList = ({tasks, patients}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <CustomListItem
            value={item}
            name={getName(patients, item.assignedPatient)}
          />
        )}
      />
    </View>
  );
};

function getName(p, id) {
  return p.filter(x => x._id === id)[0].name;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#EDF9FC',
  },
});

export default CustomList;
