import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import CustomListItem from '../CustomListItem/CustomListItem';

const CustomList = (patients) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {
            status: 'cerrado',
            description: 'Descripcion',
            dateTime: '12/12/2000',
            name: 'Cambiar suero',
            priority: true,
            assignedPatient: 'Nombre Paciente',
          },
          {
            status: 'cerrado',
            description: 'Descripcion',
            dateTime: '12/12/2000',
            name: 'Cambiar suero',
            priority: true,
            assignedPatient: 'Nombre Paciente',
          },
          {
            status: 'cerrado',
            description: 'Descripcion',
            dateTime: '12/12/2000',
            name: 'Cambiar suero',
            priority: true,
            assignedPatient: 'Nombre Paciente',
          },
          {
            status: 'cerrado',
            description: 'Descripcion',
            dateTime: '12/12/2000',
            name: 'Cambiar suero',
            priority: true,
            assignedPatient: 'Nombre Paciente',
          },
          {
            status: 'cerrado',
            description: 'Descripcion',
            dateTime: '12/12/2000',
            name: 'Cambiar suero',
            priority: true,
            assignedPatient: 'Nombre Paciente',
          },
          {
            status: 'cerrado',
            description: 'Descripcion',
            dateTime: '12/12/2000',
            name: 'Cambiar suero',
            priority: true,
            assignedPatient: 'Nombre Paciente',
          },
          {
            status: 'cerrado',
            description: 'Descripcion',
            dateTime: '12/12/2000',
            name: 'Cambiar suero',
            priority: true,
            assignedPatient: 'Nombre Paciente',
          },
          {
            status: 'cerrado',
            description: 'Descripcion',
            dateTime: '12/12/2000',
            name: 'Cambiar suero',
            priority: true,
            assignedPatient: 'Nombre Paciente',
          },
          {
            status: 'cerrado',
            description: 'Descripcion',
            dateTime: '12/12/2000',
            name: 'Cambiar suero',
            priority: true,
            assignedPatient: 'Nombre Paciente',
          },
        ]}
        renderItem={({item}) => <CustomListItem value={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default CustomList;
