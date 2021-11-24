import {LOGIN} from '../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        AsyncStorage.setItem('@user_id', json._id);
        AsyncStorage.setItem('@healthhome_id', json.assignedHealthHome);
        setError(false);
        return true;
      } else {
        console.log(response);
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

// const login = (user, password, setError) => {
//   if (user !== '' && password !== '') {
//     fetch(LOGIN, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify({
//         document: user,
//         password: password,
//       }),
//     })
//       .then(res => res)
//       .then(res => {
//         if (res.status === 200) {
//           AsyncStorage.setItem('@auth-token', res.headers.map.authorization);

//           res.json().then(
//             (json = () => {
//               AsyncStorage.setItem('@user-id', json._id);
//               AsyncStorage.setItem('@healthhome-id', json.assignedHealthHome);
//               navigation.navigate('Home');
//               setError(false);
//             }),
//           );
//         }
//       })
//       .catch(err => {
//         setError(true);
//       });
//   }
// };

export {login};
