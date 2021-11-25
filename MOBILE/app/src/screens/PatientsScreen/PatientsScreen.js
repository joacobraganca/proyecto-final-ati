import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StyleSheet, View, FlatList} from 'react-native';
import CustomList from '../../components/Patient/CustomList/CustomList';
import {connect} from 'react-redux';
import {SearchBar} from 'react-native-elements';

const PatientsScreen = ({patients}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(patients);

  const searchFilterFunction = text => {
    if (text) {
      const newData = patients.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(patients);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <SearchBar
          inputContainerStyle={{backgroundColor: 'white'}}
          leftIconContainerStyle={{backgroundColor: 'white'}}
          inputStyle={{backgroundColor: 'white'}}
          containerStyle={{
            backgroundColor: '#white',
            justifyContent: 'space-around',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          onChangeText={text => searchFilterFunction(text)}
          onClear={text => searchFilterFunction('')}
          placeholder="Escriba aqui..."
          value={search}
        />
        <CustomList patients={filteredDataSource} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
});

const mapStateToProps = state => {
  return {
    patients: state.patientReducer.patients,
  };
};

export default connect(mapStateToProps)(PatientsScreen);
