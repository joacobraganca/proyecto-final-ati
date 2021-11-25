import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CustomListItem from '../CustomListItem/CustomListItem';

const CustomList = ({value}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={value}
        keyExtractor={item => item._id}
        renderItem={({item}) => <CustomListItem value={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  data: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default CustomList;
