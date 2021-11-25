import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch} from 'react-redux';
import {updateTaskStatus} from '../../services/task.service';
import {getTasks} from '../../services/task.service';
import {addTasks} from '../../actions/tasks';
import {Icon} from 'react-native-elements';

const CustomListItem = ({value, name}) => {
  const dispatch = useDispatch();
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
        tasks.sort(function (a, b) {
          return new Date(a.dateTime) - new Date(b.dateTime);
        });
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
        <View style={styles.info}>
          <Icon name="info" color="skyblue" size={26} type="MaterialIcons" />
        </View>

        <View style={styles.details}>
          <Text style={styles.taskName}>{value.name}</Text>
          <Text style={styles.patientName}>{name}</Text>
          <Text
            style={
              value.status === 'cerrado'
                ? styles.statusNameCerrado
                : value.status === 'enCurso'
                ? styles.statusNameEnCurso
                : styles.statusNamePendiente
            }>
            {selectOptions.map(s => {
              if (s.value === value.status) {
                return s.label;
              }
            })}
          </Text>
        </View>
        <View style={styles.datetime}>
          <Text>{formatDate(value.dateTime)}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.taskName}>{value.name}</Text>
            <View style={styles.modalData}>
              <View style={styles.modalRow}>
                <Text style={styles.modalTags}>Paciente:</Text>
                <Text style={styles.modalText}> {name}</Text>
              </View>

              <View style={styles.modalRow}>
                <Text style={styles.modalTags}>Fecha:</Text>
                <Text style={styles.modalText}>
                  {formatDate(value.dateTime)}
                </Text>
              </View>
              <Text style={styles.modalTags}>Descripción:</Text>
              <Text style={styles.modalText}>{value.description}</Text>
              <View style={styles.modalRow} />

              <Text style={styles.modalTags}>Estado:</Text>
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
            </View>

            <Pressable
              disabled={!enableButton}
              style={enableButton ? styles.button : styles.buttonDisabled}
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
    backgroundColor: 'white',
    paddingVertical: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  info: {
    width: '15%',
  },
  details: {
    width: '45%',
  },
  datetime: {
    alignItems: 'center',
    width: '40%',
  },
  taskName: {
    fontSize: 16,
    marginBottom: 2,
  },
  patientName: {
    fontSize: 12,
    marginBottom: 2,
  },
  statusNameCerrado: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: 'grey',
  },
  statusNamePendiente: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: 'orange',
  },
  statusNameEnCurso: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: 'green',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(237, 249, 252, 0.7)',
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
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
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    width: 100,
  },
  buttonDisabled: {
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    padding: 10,
    width: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalData: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  modalRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  modalTags: {
    // marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default CustomListItem;
