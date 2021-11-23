import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
    // let access = await
    await login(user, password, setError);
    // if (access) {
    //   setError(false);
    //   navigation.navigate('Home');
    // } else {
    //   setError(true);
    // }
  };

  return (
    <View style={styles.root}>
      <Text>Sign In</Text>
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

      <CustomButton text="Iniciar sesión" onPress={onSignInPressed()} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  errorMsg: {
    justifyContent: 'center',
    color: 'red',
    fontSize: 14,
  },
});
export default SignInScreen;
