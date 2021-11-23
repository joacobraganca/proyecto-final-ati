import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const CustomModal = props => {
  //   const [visible, setModalVisible] = useState(visible);

  const toggleModal = () => {
    setModalVisible(!visible);
  };

  function afterOpenModal(e) {
    props.onAfterOpen(e, 'After Modal Opened');
  }

  function onModalClose(event) {
    let data = {name: 'example', type: 'closed from child'};
    props.onCloseModal(event, data);
  }

  return (
    <View>
      <Modal
        isOpen={props.IsModalOpened}
        onAfterOpen={e => afterOpenModal(e)}
        style={styles.content}
        ariaHideApp={false}>
        <View style={{flex: 1}}>
          <Text>I am the modal content!</Text>
        </View>
        <Button title="Hide modal" onClick={e => onModalClose(e)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: '70%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
});

export default CustomModal;
