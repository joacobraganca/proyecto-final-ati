import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch} from 'react-redux';
import {updateTaskStatus} from '../../services/task.service';
import {getTasks} from '../../services/task.service';
import {addTasks} from '../../actions/tasks';
import {Icon} from 'react-native-elements';

const CustomListItem = ({value, name}) => {
  const dispatch = useDispatch();

  const [check, setCheck] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [enableButton, setEnableButton] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    let values = [
      {
        value: 'cerrado',
        label: 'Cerrado',
      },
      {
        value: 'pendiente',
        label: 'Pendiente',
      },
      {
        value: 'enCurso',
        label: 'En curso',
      },
    ];

    setSelectOptions(values);
  }, []);

  const updateStatus = async (task, status) => {
    if (status !== null && task.status !== status) {
      const response = await updateTaskStatus(task._id, status);
      if (response) {
        const priorityTasks = [];
        const otherTasks = [];
        const tasks = await getTasks();
        tasks.forEach(task => {
          if (task.priority) {
            priorityTasks.push(task);
          } else {
            otherTasks.push(task);
          }
        });

        dispatch(addTasks({priorityTasks, otherTasks}));
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.checkbox}>
          <Icon name="info" color="grey" size={26} type="MaterialIcons" />
        </View>

        <View style={styles.details}>
          <Text>{value.name}</Text>
          <Text>{name}</Text>
        </View>
        <View style={styles.datetime}>
          <Text>{formatDate(value.dateTime)}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.centeredView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{value.name}</Text>
              <Text style={styles.modalText}>Paciente: {name}</Text>
              <Text style={styles.modalText}>
                Fecha: {formatDate(value.dateTime)}
              </Text>
              <Text style={styles.modalText}>Descripción:</Text>
              <Text style={styles.modalText}>{value.description}</Text>

              <RNPickerSelect
                placeholder={{
                  label: 'Seleccione estado...',
                  value: null,
                }}
                placeholderTextColor="red"
                value={value.status}
                onValueChange={value => {
                  if (value === null) {
                    setEnableButton(false);
                  } else {
                    setSelectedValue(value);
                    setEnableButton(true);
                  }
                }}
                items={selectOptions}
              />
              <Pressable
                disabled={!enableButton}
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  updateStatus(value, selectedValue);
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Aceptar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const formatDate = date => {
  let d = new Date(date);
  var month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    minute = d.getMinutes();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return (
    [day, month, year].join('/') +
    ' ' +
    [hour, minute < 10 ? '0' + minute : minute].join(':')
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
    width: '15%',
  },
  details: {
    width: '45%',
  },
  datetime: {
    width: '40%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CustomListItem;
