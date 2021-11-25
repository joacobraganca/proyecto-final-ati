import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigation from './src/navigation';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {getTasks} from './src/services/task.service';
import {addTasks} from './src/actions/tasks';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
      updateTasks();
    });
    return unsubscribe;
  }, []);

  const updateTasks = async () => {
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
  };

  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
