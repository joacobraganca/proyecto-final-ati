import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import CustomModal from '../CustomModal/CustomModal';

const CustomListItem = ({value}) => {
  const [check, setCheck] = useState(false);
  const [isModalVisible, setVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const modalData = {
    title: 'My Title From Parent',
    body: ['Apple', 'Ipple', 'Opple', 'Upple', 'Epple'],
  };
  const openFromParent = () => {
    setIsOpen(true);
  };
  const handleCloseModal = (event, data) => {
    console.log(event, data);
    setIsOpen(false);
  };
  const handleAfterOpen = (event, data) => {
    console.log(event, data);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}
        onPress={openFromParent}>
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
      <CustomModal
        dynData={modalData}
        IsModalOpened={modalIsOpen}
        onCloseModal={handleCloseModal}
        onAfterOpen={handleAfterOpen}
      />
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
