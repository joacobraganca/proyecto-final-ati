import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import CustomImput from '../../components/CustomImput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {login} from '../../services/user.service';

const SignInScreen = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const navigation = useNavigation();

  const onSignInPressed = async () => {
    let access = await login(user, password, setError);
    if (access) {
      setError(false);
      navigation.navigate('Home');
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/logo.png')}
        />
        <Text style={styles.title}>Gestor de casas de salud</Text>
      </View>

      <CustomImput
        placeholder="Documento"
        value={user}
        setValue={setUser}
        secureTextEntry={false}
      />
      <CustomImput
        placeholder="Contraseña"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      {error ? (
        <Text style={styles.errorMsg}>
          Documento y/o contraseña incorrectos.
        </Text>
      ) : null}

      <CustomButton
        text="Iniciar sesión"
        onPress={onSignInPressed}
        type={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#EDF9FC',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {marginVertical: 25, alignItems: 'center'},
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
  },

  errorMsg: {
    justifyContent: 'center',
    color: 'red',
    fontSize: 14,
  },
});

export default SignInScreen;
