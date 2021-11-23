import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import SignInScreen from './src/screens/SignInScreen/SingInScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <SignInScreen />
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
