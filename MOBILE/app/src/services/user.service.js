import {LOGIN, NOTIFICATION} from '../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const login = async (user, password, setError) => {
  try {
    if (user !== '' && password !== '') {
      const response = await fetch(LOGIN, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          document: user,
          password: password,
        }),
      });

      if (response.status === 200) {
        AsyncStorage.setItem('@auth_token', response.headers.map.authorization);
        const json = await response.json();
        AsyncStorage.setItem('@user_name', json.name);
        AsyncStorage.setItem('@user_id', json._id);
        AsyncStorage.setItem('@healthhome_id', json.assignedHealthHome);
        const tokenNotification = await getToken();
        if (tokenNotification && tokenNotification != json.tokenNotification) {
          await putTokenNotification(tokenNotification, json._id);
        }
        setError(false);
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    return false;
  }
};

const putTokenNotification = async (tokenNotification, _id) => {
  const token = await AsyncStorage.getItem('@auth_token');
  try {
    await fetch(NOTIFICATION, {
      method: 'PUT',
      body: JSON.stringify({
        _id: _id,
        tokenNotification: tokenNotification,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  } catch (error) {
    return [];
  }
};

const getToken = async () => {
  return await messaging().getToken();
};

export {login};
