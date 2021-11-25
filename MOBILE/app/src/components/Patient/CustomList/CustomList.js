import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CustomListItem from '../CustomListItem/CustomListItem';

const CustomList = ({patients}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={patients}
        keyExtractor={item => item._id}
        renderItem={({item}) => <CustomListItem value={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#EDF9FC',
    height: '100%',
  },
});

export default CustomList;
